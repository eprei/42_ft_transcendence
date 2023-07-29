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
    private frameInterval: NodeJS.Timeout
    private loger: Logger = new Logger('PongGateway')

    @WebSocketServer()
    server: Server

    constructor(
        private readonly pongService: PongService,
        private readonly socket: Server
    ) {}

    afterInit(server: any) {
        this.loger.log('Server socket is initialized')
        // Llamamos a la función inicialmente cuando se establece la conexión
        const frame = this.pongService.getFrame()
        this.sendFrameToClients(frame)

        // Configuramos el intervalo para llamar a la función 24 veces por segundo
        this.frameInterval = setInterval(() => {
            const frame = this.pongService.getFrame()
            this.sendFrameToClients(frame)
        }, 1000 / 24) // 24 fps
    }

    handleConnection(client: any, ...args: any[]) {
        this.loger.log(`Client socket connected: ${client.id}`)
    }

    handleDisconnect(client: any) {
        this.loger.log(`Client socket disconnected: ${client.id}`)
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
        // console.log('sendFrameToClients')
        // console.log(frame)
        this.server.emit('sendFrames', frame)
    }

    @SubscribeMessage('movePaddle')
    handleMovePaddle(client: Socket, data: { direction: string }) {
        const { direction } = data
        // Actualizar el fotograma en el servicio
        const updatedFrame = this.pongService.updateFrame(direction)
        // Emitir el fotograma actualizado a todos los clientes conectados
        this.sendFrameToClients(updatedFrame)
    }

    @SubscribeMessage('getFrame')
    myGetFrame() {
        this.pongService.updateFrameLogic()
        const frame = this.pongService.getFrame()
        return frame
    }
}
