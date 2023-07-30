import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets'
import { PongService } from './pong.service'
import { Frame } from './entities/pong.entity'
import { Socket, Server } from 'socket.io'
import { WebSocketServer } from '@nestjs/websockets'
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'

const FPS: number = 25
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class PongGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    private loger: Logger = new Logger('PongGateway')
    private frameIntervals: { [roomId: string]: NodeJS.Timeout } = {}
    private pongServices: { [roomId: string]: PongService } = {}

    @WebSocketServer()
    server: Server

    afterInit(server: any) {
        this.loger.log('Game server is initialized')
    }

    handleConnection(client: Socket, ...args: any[]) {
        const requestOrigin = client.handshake.headers.origin
        if (requestOrigin !== 'http://localhost:4040') {
            client.disconnect()
            return
        }
        this.loger.log(`Client socket connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.loger.log(`Client socket disconnected: ${client.id}`)
        // TODO: Handle cleanup when a client disconnects. Leave the room, etc.
    }

    @SubscribeMessage('createRoom')
    handleCreateRoom(client: Socket, roomId: string) {
        console.log('control 1')
        client.join(roomId)
        console.log('control 2')
        this.pongServices[roomId] = new PongService()
        console.log('control 3')
        this.pongServices[roomId].startGame()
        console.log('control 4')
        this.frameIntervals[roomId] = setInterval(() => {
            const frame = this.pongServices[roomId].getFrame()
            this.sendFrameToRoom(roomId, frame)
        }, 1000 / FPS)
        console.log('control 5')
        client.emit('roomCreated', roomId)
        console.log('control 6')
        this.loger.log(`Room created: ${roomId}`)
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, roomId: string) {
        if (this.pongServices[roomId]) {
            client.join(roomId)
            client.emit('joinedRoom', roomId)
            this.loger.log(`Client socket ${client.id} joined room: ${roomId}`)
        } else {
            client.emit('error', 'Room does not exist')
        }
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, roomId: string) {
        client.leave(roomId)
        client.emit('leftRoom', roomId)
        this.loger.log(`Client socket ${client.id} left room: ${roomId}`)
        // TODO: Handle cleanup when a client leaves a room
    }

    sendFrameToRoom(roomId: string, frame: Frame) {
        this.server.to(roomId).emit('sendFrames', frame)
    }

    @SubscribeMessage('movePaddle')
    handleMovePaddle(
        client: Socket,
        data: { direction: string; roomId: string }
    ) {
        const { direction, roomId } = data
        if (!this.pongServices[roomId]) {
            console.error(`No PongService found for roomId ${roomId}`)
            return
        }
        this.pongServices[roomId].updateFrame(direction)
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
    handleResetGame(client: Socket, roomId: string) {
        this.pongServices[roomId].resetGame()
        const updatedFrame = this.pongServices[roomId].getFrame()
        this.sendFrameToRoom(roomId, updatedFrame)
    }
}
