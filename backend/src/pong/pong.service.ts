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
        score: { playerOne: 0, playerTwo: 0 },
        gameOver: false,
    }

    gameActive: boolean = true

    startGame(): void {
        this.gameActive = true
        this.frame.score.playerOne = 0
        this.frame.score.playerTwo = 0
        this.frame.ball.position.x = FRAME_WIDTH / 2
        this.frame.ball.position.y = FRAME_HEIGHT / 4
        this.frame.gameOver = false
    }

    resetGame(): void {
        this.gameActive = false
        this.frame.score.playerOne = 0
        this.frame.score.playerTwo = 0
        this.frame.ball.position.x = FRAME_WIDTH / 2
        this.frame.ball.position.y = FRAME_HEIGHT / 4
        this.frame.gameOver = false
    }

    simpleFrame(): Frame {
        return this.frame
    }

    updateFrame(direction?: string): Frame {
        // Update the position of the pallet according to the direction provided
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
        if (!this.gameActive) {
            return
        }
        this.frame.ball.position.x += BALL_SPEED_X
        this.frame.ball.position.y += BALL_SPEED_Y

        // Reverse vertical direction if it reaches the vertical limits of the screen
        if (
            this.frame.ball.position.y + BALL_SIZE >= FRAME_HEIGHT / 2 ||
            this.frame.ball.position.y <= 0
        ) {
            BALL_SPEED_Y *= -1
        }

        // Change the direction of the ball when it hits a paddle
        if (
            (this.frame.ball.position.x <=
                this.frame.paddleLeft.position.x + PADDLE_WIDTH &&
                this.frame.ball.position.y + BALL_SIZE >=
                    this.frame.paddleLeft.position.y &&
                this.frame.ball.position.y <=
                    this.frame.paddleLeft.position.y + PADDLE_HEIGHT) ||
            (this.frame.ball.position.x + BALL_SIZE >=
                this.frame.paddleRight.position.x &&
                this.frame.ball.position.y + BALL_SIZE >=
                    this.frame.paddleRight.position.y &&
                this.frame.ball.position.y <=
                    this.frame.paddleRight.position.y + PADDLE_HEIGHT)
        ) {
            BALL_SPEED_X *= -1
        }

        // Reset the position of the ball when it leaves the playing field
        if (this.frame.ball.position.x + BALL_SIZE >= FRAME_WIDTH) {
            this.frame.ball.position.x = FRAME_WIDTH / 2
            this.frame.ball.position.y = FRAME_HEIGHT / 4
            this.frame.score.playerOne += 1
            if (this.frame.score.playerOne >= 10) {
                this.frame.gameOver = true
                this.frame.score.playerOne = 0
                this.frame.score.playerTwo = 0
            }
        } else if (this.frame.ball.position.x <= 0) {
            this.frame.ball.position.x = FRAME_WIDTH / 2
            this.frame.ball.position.y = FRAME_HEIGHT / 4
            this.frame.score.playerTwo += 1
            if (this.frame.score.playerTwo >= 10) {
                this.frame.gameOver = true
                this.frame.score.playerOne = 0
                this.frame.score.playerTwo = 0
            }
        }

        if (
            this.frame.score.playerOne >= 10 ||
            this.frame.score.playerTwo >= 10
        ) {
            this.gameActive = false
        }
    }

    getFrame(): Frame {
        this.updateFrameLogic()
        return this.frame
    }
}
