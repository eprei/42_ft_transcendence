import styles from './Game.module.css'

const Game = () => {
    return (
        <>
            <h1>The Game</h1>
            <canvas className={styles.boarGame}></canvas>
        </>
    )
}

export default Game
