import { Injectable } from '@nestjs/common'
import { CreatePongDto } from './dto/create-pong.dto'
import { UpdatePongDto } from './dto/update-pong.dto'
import { Frame } from './entities/pong.entity'

@Injectable()
export class PongService {
    simpleFrame(): Frame {
        const PADDLE_WIDTH: number = 10
        const PADDLE_HEIGHT: number = 50
        const BALL_SIZE: number = 10
        console.log('coucou')
        let frame: Frame = {
            paddleLeft: {
                position: {
                    x: 10,
                    y: 20,
                },
                size: {
                    width: PADDLE_WIDTH,
                    height: PADDLE_HEIGHT,
                },
            },
            paddleRight: {
                position: {
                    x: 280,
                    y: 20,
                },
                size: {
                    width: PADDLE_WIDTH,
                    height: PADDLE_HEIGHT,
                },
            },
            ball: {
                position: {
                    x: 50,
                    y: 50,
                },
                size: {
                    width: BALL_SIZE,
                    height: BALL_SIZE,
                },
            },
        }
        return frame
    }
}
