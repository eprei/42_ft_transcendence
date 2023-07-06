import styles from './TempPlayerLi.module.css'
import { Player } from '../../types/Player'

interface TempPlayerLiProps {
    deletePlayerHandler: (first_name: string) => void
    player: Player
}

const TempPlayerLi = (props: TempPlayerLiProps) => {
    const deletePlayer = () => {
        props.deletePlayerHandler(props.player.first_name)
    }
    return (
        <li className={styles.li}>
            <div className={styles.info}>
                <div>
                    <h2>{props.player.first_name}</h2>
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
