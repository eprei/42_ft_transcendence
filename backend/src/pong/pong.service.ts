import { Injectable } from '@nestjs/common'
import { Frame } from './entities/pong.entity'

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
        console.log('updateFrame')
        // Actualizar la posición de la paleta según la dirección proporcionada
        if (direction === 'up') {
            this.frame.paddleLeft.position.y -= PADDLE_SPEED
        } else if (direction === 'down') {
            this.frame.paddleLeft.position.y += PADDLE_SPEED
        }

        // Aquí va la lógica para mover las paletas y la pelota
        // Puedes usar variables para representar la velocidad y dirección de las paletas y la pelota, y calcular las nuevas posiciones en función de ellas.
        // Por ejemplo:
        // this.frame.paddleLeft.position.y += this.paddleLeftSpeed;
        // this.frame.ball.position.x += this.ballSpeedX;
        // this.frame.ball.position.y += this.ballSpeedY;

        // Resto del código para actualizar la posición de la pelota y las paletas.

        // Retornar el fotograma actualizado
        return this.frame
    }

    updateFrameLogic() {
        // Actualizar la posición de la pelota
        this.frame.ball.position.x += BALL_SPEED_X
        this.frame.ball.position.y += BALL_SPEED_Y

        // Lógica para evitar que la pelota se salga de la pantalla
        if (
            this.frame.ball.position.x + BALL_SIZE >= 400 ||
            this.frame.ball.position.x <= 0
        ) {
            // Invertir dirección horizontal si alcanza los límites horizontales de la pantalla
            BALL_SPEED_X *= -1
        }
        if (
            this.frame.ball.position.y + BALL_SIZE >= 200 ||
            this.frame.ball.position.y <= 0
        ) {
            // Invertir dirección vertical si alcanza los límites verticales de la pantalla
            BALL_SPEED_Y *= -1
        }

        // Lógica para mover las paletas
        if (
            this.frame.paddleLeft.position.y + PADDLE_HEIGHT >= 200 ||
            this.frame.paddleLeft.position.y <= 0
        ) {
            PADDLE_SPEED *= -1
        }
        this.frame.paddleLeft.position.y += PADDLE_SPEED
    }

    getFrame(): Frame {
        this.updateFrame()
        return this.frame
    }
}
