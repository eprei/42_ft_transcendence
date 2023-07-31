import BoardGame from './../components/pong/BoardGame'
import styles from './Game.module.css'
import { useLocation } from 'react-router-dom'

const Game = () => {
    const location = useLocation()
    const roomId = location.state.roomId
    const player_one = location.state.player_one
    const player_two = location.state.player_two
    const theme = location.state.theme

    return (
        <div className={styles.container}>
            <div className={styles.verticalLine}></div>
            <BoardGame
                room={roomId}
                player_one={player_one}
                player_two={player_two}
                theme={theme}
                imPlayerOne={location.state.imPlayerOne}
            />
        </div>
    )
}

export default Game
