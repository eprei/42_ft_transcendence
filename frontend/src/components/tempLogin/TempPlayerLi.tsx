import styles from './TempPlayerLi.module.css'

interface Player {
    login: string
    email: string
    avatarUrl: string
}

const TempPlayerLi = ({player}: {player: Player}) => {
    return (
        <li className={styles.li}>
            <div>
            <h2>{player.login}</h2>
            <p>{player.email}</p>
            </div>
            <div>
                <img src={player.avatarUrl} alt="avatar pic" />
            </div>
        </li>
    )
}

export default TempPlayerLi
