import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets'
import { PongService } from './pong.service'
import { Frame } from './entities/pong.entity'
import { Socket, Server } from 'socket.io'
import { WebSocketServer } from '@nestjs/websockets'
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class PongGateway {
    private frameInterval: NodeJS.Timeout

    @WebSocketServer()
    server: Server

    constructor(
        private readonly pongService: PongService,
        private readonly socket: Server
    ) {}
    handleGetFrame() {
        return this.pongService.getFrame() // Function tu get the updated frame
    }

    // Function to send the frame to all conected clients
    sendFrameToClients(frame: Frame) {
        console.log('sendFrameToClients')
        console.log(frame)
        this.server.emit('sendFrames', frame)
    }

    afterInit() {
        // Llamamos a la función inicialmente cuando se establece la conexión
        const frame = this.pongService.getFrame()
        this.sendFrameToClients(frame)

        // Configuramos el intervalo para llamar a la función 24 veces por segundo
        this.frameInterval = setInterval(() => {
            const frame = this.pongService.getFrame()
            this.sendFrameToClients(frame)
        }, 1000 / 24) // 24 fps
    }

    @SubscribeMessage('movePaddle')
    handleMovePaddle(client: Socket, data: { direction: string }) {
        const { direction } = data
        // Obtener el fotograma actual
        const frame = this.pongService.getFrame()
        // Mover las paletas según la dirección enviada desde el frontend
        console.log(direction)
        if (direction === 'up') {
            frame.paddleLeft.position.y -= 5 // Mover la paleta izquierda hacia arriba
        } else if (direction === 'down') {
            frame.paddleLeft.position.y += 5 // Mover la paleta izquierda hacia abajo
        }
        // Actualizar el fotograma en el servicio
        const updatedFrame = this.pongService.updateFrame(direction)
        // Emitir el fotograma actualizado a todos los clientes conectados
        this.sendFrameToClients(frame)
    }

    @SubscribeMessage('getFrame')
    myGetFrame() {
        this.pongService.updateFrameLogic() // Llamamos al método para actualizar el fotograma antes de enviarlo
        const frame = this.pongService.getFrame()
        return frame
    }
}
