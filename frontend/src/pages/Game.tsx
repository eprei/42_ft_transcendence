import BoardGame from './../components/pong/BoardGame'
import styles from './Game.module.css'

const Game = () => {
    return (
        <div className={styles.container}>
            <div className={styles.verticalLine}></div>
            <BoardGame />
        </div>
    )
}

export default Game
