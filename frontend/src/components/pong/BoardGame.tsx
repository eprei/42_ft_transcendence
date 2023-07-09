import styles from './BoardGame.module.css'
import { useState, useEffect } from 'react'

function drawRectangle(ctx: CanvasRenderingContext2D, rectangle): void {
    ctx.fillStyle = 'white'
    ctx.fillRect(
        rectangle.position.x,
        rectangle.position.y,
        rectangle.size.width,
        rectangle.size.height
    )
}

const BoardGame = () => {
    const PADDLE_WIDTH: number = 10
    const PADDLE_HEIGHT: number = 50
    const BALL_SIZE: number = 10

    const [frame, setFrame] = useState({
        paddle1: {
            position: {
                x: 10,
                y: 20,
            },
            size: {
                width: PADDLE_WIDTH,
                height: PADDLE_HEIGHT,
            },
        },
        paddle2: {
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
    })

    useEffect(() => {
        let canvas: HTMLCanvasElement | null = document.getElementById(
            'boardGame'
        ) as HTMLCanvasElement
        if (canvas === null) {
            console.log('fail get canvas element')
            // TODO manage error
        }
        let ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
        if (ctx === null) {
            throw 'fail get context'
            // TODO manage error
        }

        drawRectangle(ctx, frame.paddle1)
        drawRectangle(ctx, frame.paddle2)
        drawRectangle(ctx, frame.ball)

        console.log(JSON.stringify(frame))
    }, [frame])

    return <canvas id="boardGame" className={styles.boarGame}></canvas>
}

export default BoardGame
