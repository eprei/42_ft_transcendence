import styles from './BoardGame.module.css'
import { useEffect } from 'react'

interface Position {
    x: number
    y: number
}
interface Size {
    width: number
    height: number
}

interface Rectangle {
    size: Size
    position: Position
}

interface Frame {
    paddleLeft: Rectangle
    paddleRight: Rectangle
    ball: Rectangle
}

function drawRectangle(
    ctx: CanvasRenderingContext2D,
    rectangle: Rectangle
): void {
    ctx.fillStyle = 'white'
    ctx.fillRect(
        rectangle.position.x,
        rectangle.position.y,
        rectangle.size.width,
        rectangle.size.height
    )
}

const BoardGame = () => {
    const frame = {
        paddleLeft: {
            size: { width: 20, height: 100 },
            position: { x: 10, y: 20 },
        },
        paddleRight: {
            size: { width: 10, height: 50 },
            position: { x: 100, y: 70 },
        },
        ball: {
            size: { width: 10, height: 20 },
            position: { x: 50, y: 50 },
        },
    }

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

        drawRectangle(ctx, frame.paddleLeft)
        drawRectangle(ctx, frame.paddleRight)
        drawRectangle(ctx, frame.ball)

        console.log(JSON.stringify(frame))
    }, [frame])

    return <canvas id="boardGame" className={styles.boarGame}></canvas>
}

export default BoardGame
