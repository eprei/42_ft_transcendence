import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { PongService } from './pong.service'
import { CreatePongDto } from './dto/create-pong.dto'
import { UpdatePongDto } from './dto/update-pong.dto'

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class PongGateway {
    constructor(private readonly pongService: PongService) {}

}
