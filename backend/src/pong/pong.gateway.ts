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
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class PongGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    private loger: Logger = new Logger('PongGateway')
    private frameIntervals: { [clientId: string]: NodeJS.Timeout } = {}

    @WebSocketServer()
    server: Server

    constructor(
        private readonly pongService: PongService,
        private readonly socket: Server
    ) {}

    afterInit(server: any) {
        this.loger.log('Server socket is initialized')
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.loger.log(`Client socket connected: ${client.id}`)

        this.frameIntervals[client.id] = setInterval(() => {
            const frame = this.pongService.getFrame()
            this.sendFrameToClients(frame)
        }, 1000 / 50) // 50 fps
    }

    handleDisconnect(client: Socket) {
        this.loger.log(`Client socket disconnected: ${client.id}`)

        clearInterval(this.frameIntervals[client.id])
        delete this.frameIntervals[client.id]
    }

    handleGetFrame() {
        return this.pongService.getFrame() // Function tu get the updated frame
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, roomId: string) {
        client.join(roomId)
        client.emit('joinedRoom', roomId)
        this.loger.log(`Client socket ${client} joined room: ${roomId}`)
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, roomId: string) {
        client.leave(roomId)
        client.emit('leftRoom', roomId)
        this.loger.log(`Client socket ${client} left room: ${roomId}`)
    }

    // Function to send the frame to all conected clients
    sendFrameToClients(frame: Frame) {
        this.server.emit('sendFrames', frame)
    }

    @SubscribeMessage('movePaddle')
    handleMovePaddle(client: Socket, data: { direction: string }) {
        const { direction } = data
        const updatedFrame = this.pongService.updateFrame(direction)

        this.sendFrameToClients(updatedFrame)
    }

    @SubscribeMessage('getFrame')
    myGetFrame() {
        this.pongService.updateFrameLogic()
        const frame = this.pongService.getFrame()
        return frame
    }
}
