import styles from './Game.module.css'
import { useState, useEffect } from 'react'

const Game = () => {
    const [frame, setFrame] = useState({
        paddle: {
            position: {
                x: 10,
                y: 20,
            },
            size: {
                width: 10,
                height: 50,
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
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d')
        ctx.fillStyle = 'green'
        ctx.fillRect(
            frame.paddle.position.x,
            frame.paddle.position.y,
            frame.paddle.size.width,
            frame.paddle.size.height
        )

        console.log(JSON.stringify(frame))
    }, [frame])

    return (
        <>
            <h1>The Game</h1>
            <canvas id="boardGame" className={styles.boarGame}></canvas>
        </>
    )
}

export default Game
