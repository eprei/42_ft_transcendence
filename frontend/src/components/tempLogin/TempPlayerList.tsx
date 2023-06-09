import TempPlayerLi from './TempPlayerLi'
import styles from './TempPlayerList.module.css'
import { Player } from '../../types/Player'

interface TempPlayerListProps {
    players: Player[]
}

const TempPlayerList = (props: TempPlayerListProps) => {
    let content: JSX.Element[] | JSX.Element = <p>No Player Found!</p>
    if (props.players.length > 0) {
        content = props.players.map((player: Player) => (
            <TempPlayerLi key={player.login} player={player}></TempPlayerLi>
        ))
    }

    return (
        <div className={styles.container}>
            <ul>{content}</ul>
        </div>
    )
}

export default TempPlayerList
