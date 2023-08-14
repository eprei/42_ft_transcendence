import {
    WebSocketGateway,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    WebSocketServer,
} from '@nestjs/websockets'
import { PongService } from './pong.service'
import { Frame } from './entities/pong.entity'
import { Socket, Server } from 'socket.io'
import { Logger } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as passport from 'passport'
import sessionMiddleware from '../sessions'
import { subscribe } from 'diagnostics_channel'
import { User } from 'src/typeorm/user.entity'
import { IncomingMessage } from 'http'

const wrap = (middleware: any) => (socket: Socket, next: (err?: any) => void) =>
    middleware(socket.request, {}, next)

interface CustomSocket extends Socket {
    request: IncomingMessage & {
        user?: User
    }
}

const FPS: number = 80
@WebSocketGateway({ path: '/pongws/', namespace: 'game' })
export class PongGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(private userService: UserService) {}
    private loger: Logger = new Logger('PongGateway')
    private frameIntervals: { [roomId: string]: NodeJS.Timeout } = {}
    private pongServices: { [roomId: string]: PongService } = {}
    private waitingForSecondPlayer: { [roomId: string]: boolean } = {}
    private secondPlayerIds: { [roomId: string]: number } = {}

    @WebSocketServer()
    server: Server

    afterInit(server: Server) {
        server.use(wrap(sessionMiddleware))
        server.use(wrap(passport.initialize()))
        server.use(wrap(passport.session()))
        server.use((client: any, next) => {
            if (!client.request.isAuthenticated() || !client.request.user) {
                next(new Error('unauthorized'))
            } else {
                console.log('authorized')
                next()
            }
        })
    }

    handleConnection(client: CustomSocket, ...args: any[]) {
        if (!client.request.user) {
            throw new Error('No user')
        }
        this.userService.changeStatusOnLine(client.request.user.id)
        this.sendReloadMsg()
        this.loger.log(`Client socket connected: ${client.request.user.id}`)
    }

    async handleDisconnect(client: CustomSocket) {
        this.loger.log(`Client socket disconnected: ${client.request.user.id}`)
        await this.userService.changeStatusOffline(client.request.user.id)
        this.server.emit('clientDisconnected', client.request.user.id)
        this.sendReloadMsg()
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: CustomSocket, roomId: string) {
        console.log(client.request.user)
        client.join(roomId)
        this.pongServices[roomId] = new PongService()
        this.waitingForSecondPlayer[roomId] = true
        this.loger.log(`Room created: ${roomId}`)
        client.emit('waitingForSecondPlayer', roomId)
        this.sendReloadMsg()
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, [roomId, playerId]: [string, number]) {
        if (this.pongServices[roomId]) {
            client.join(roomId)
            this.secondPlayerIds[roomId] = playerId
            this.loger.log(`Client socket ${client.id} joined room: ${roomId}`)
            if (this.waitingForSecondPlayer[roomId]) {
                this.waitingForSecondPlayer[roomId] = false
                setTimeout(() => {
                    this.startGame(roomId)
                    this.emitSecondPlayerJoined(roomId)
                }, 3000)
            }
            this.sendReloadMsg()
        } else {
            client.emit('error', 'Room does not exist')
        }
    }

    private emitSecondPlayerJoined(roomId: string) {
        const playerId = this.secondPlayerIds[roomId]
        this.server.to(roomId).emit('secondPlayerJoined', playerId)
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, data: { roomId: string; userId: number }) {
        const { roomId, userId } = data
        client.leave(roomId)
        this.server.to(roomId).emit('leftRoom')
        this.loger.log(`Client socket ${client.id} left room: ${roomId}`)
        this.userService.changeStatusOnLine(userId)
        this.sendReloadMsg()
    }

    private startGame(roomId: string) {
        this.pongServices[roomId].startGame()
        this.frameIntervals[roomId] = setInterval(() => {
            const frame = this.pongServices[roomId].getFrame()
            this.sendFrameToRoom(roomId, frame)
        }, 1000 / FPS)
    }

    sendFrameToRoom(roomId: string, frame: Frame) {
        this.server.to(roomId).emit('sendFrames', frame)
    }

    @SubscribeMessage('movePaddle')
    handleMovePaddle(
        client: Socket,
        data: { player: string; direction: string; roomId: string }
    ) {
        const { player, direction, roomId } = data
        if (!this.pongServices[roomId]) {
            console.error(`No PongService found for roomId ${roomId}`)
            return
        }
        this.pongServices[roomId].updateFrame(
            player,
            direction === 'ArrowUp' ? 'up' : 'down'
        )
    }

    @SubscribeMessage('getFrame')
    handleGetFrame(client: Socket, roomId: string) {
        this.pongServices[roomId].updateFrameLogic()
        const frame = this.pongServices[roomId].getFrame()
        return frame
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, roomId: string) {
        this.pongServices[roomId].startGame()
        const updatedFrame = this.pongServices[roomId].getFrame()
        this.sendFrameToRoom(roomId, updatedFrame)
    }

    @SubscribeMessage('resetGame')
    handleResetGame(client: Socket, data: { userId: number }) {
        const { userId } = data
        const roomId = client.rooms[0]
        clearInterval(this.frameIntervals[roomId])
        delete this.pongServices[roomId]
        delete this.frameIntervals[roomId]
        delete this.waitingForSecondPlayer[roomId]
        delete this.secondPlayerIds[roomId]
        this.userService.changeStatusOnLine(userId)
        client.leave(roomId)
    }

    @SubscribeMessage('sendInvitation')
    handleSendInvitation(
        client: Socket,
        data: {
            player_one_nickname: string
            player_one_id: number
            player_two: number
            room: string
        }
    ) {
        const { player_one_id, player_one_nickname, player_two, room } = data
        this.server.emit('receiveInvitation', {
            player_one_id,
            player_one_nickname,
            player_two,
            room,
        })
    }

    @SubscribeMessage('cancelInvitation')
    handleCancelInvitation(
        client: Socket,
        data: { player_two: number; room: string }
    ) {
        const { player_two, room } = data
        this.server.emit('cancelInvitation', { player_two, room })
    }

    @SubscribeMessage('declineInvitation')
    handleDeclineInvitation(
        client: Socket,
        data: { player_one: number; player_two: string; room: string }
    ) {
        const { player_one, player_two, room } = data
        this.server.emit('declineInvitation', { player_one, player_two, room })
    }

    sendReloadMsg() {
        this.server.emit('reload')
    }
}
