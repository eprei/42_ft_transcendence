import styles from './Game.module.css'
import { useState } from 'react'

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

    console.log(frame)

    return (
        <>
            <h1>The Game</h1>
            <canvas className={styles.boarGame}></canvas>
        </>
    )
}

export default Game
