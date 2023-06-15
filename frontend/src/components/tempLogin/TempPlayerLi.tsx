import styles from './TempPlayerLi.module.css'
import { Player } from '../../types/Player'

interface TempPlayerLiProps {
    deletePlayerHandler: (login: string) => void
    player: Player
}

const TempPlayerLi = (props: TempPlayerLiProps) => {
    const deletePlayer = () => {
        props.deletePlayerHandler(props.player.login)
    }
    return (
        <li className={styles.li}>
            <div className={styles.info}>
                <div>
                    <h2>{props.player.login}</h2>
                    <p>{props.player.email}</p>
                </div>
                <img src={props.player.avatarUrl} alt="avatar pic" />
            </div>
            <button className={styles.btn} onClick={deletePlayer}>
                Delete User
            </button>
        </li>
    )
}

export default TempPlayerLi
