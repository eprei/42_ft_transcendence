import BoardGame from './../components/pong/BoardGame'
import styles from './Game.module.css'

const Game = () => {
    return (
        <div className={styles.container}>
            <BoardGame />
        </div>
    )
}

export default Game
