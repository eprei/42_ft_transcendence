import { Injectable } from '@nestjs/common'
import { Frame } from './entities/pong.entity'

const FRAME_WIDTH: number = 300
const FRAME_HEIGHT: number = 300
const PADDLE_WIDTH: number = 10
const PADDLE_HEIGHT: number = 50
let BALL_SIZE: number = 10
let BALL_SPEED_X: number = 5
let BALL_SPEED_Y: number = 5
let PADDLE_SPEED: number = 8

@Injectable()
export class PongService {
    frame: Frame = {
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

    simpleFrame(): Frame {
        return this.frame
    }

    updateFrame(direction?: string): Frame {
        // Actualizar la posición de la paleta según la dirección proporcionada
        if (direction === 'up' && this.frame.paddleLeft.position.y > 0) {
            this.frame.paddleLeft.position.y -= PADDLE_SPEED
        } else if (
            direction === 'down' &&
            this.frame.paddleLeft.position.y +
                this.frame.paddleLeft.size.height <
                FRAME_HEIGHT / 2
        ) {
            this.frame.paddleLeft.position.y += PADDLE_SPEED
        }
        return this.frame
    }

    updateFrameLogic() {
        // Actualizar la posición de la pelota
        this.frame.ball.position.x += BALL_SPEED_X
        this.frame.ball.position.y += BALL_SPEED_Y

        // Lógica para evitar que la pelota se salga de la pantalla
        if (
            this.frame.ball.position.x + BALL_SIZE >= FRAME_WIDTH ||
            this.frame.ball.position.x <= 0
        ) {
            // Invertir dirección horizontal si alcanza los límites horizontales de la pantalla
            BALL_SPEED_X *= -1
        }
        if (
            this.frame.ball.position.y + BALL_SIZE >= FRAME_HEIGHT / 2 ||
            this.frame.ball.position.y <= 0
        ) {
            // Invertir dirección vertical si alcanza los límites verticales de la pantalla
            BALL_SPEED_Y *= -1
        }
    }

    getFrame(): Frame {
        this.updateFrameLogic()
        return this.frame
    }
}
