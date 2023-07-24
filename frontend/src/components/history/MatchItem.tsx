import { MatchData } from '../../types/MatchData'
import styles from './MatchItem.module.css'

interface MatchProps {
    key: number
    data: MatchData
}

const MatchItem = (props: MatchProps) => {
    const {
        winnerPfp,
        winnerNick,
        loserPfp,
        loserNick,
        scoreWinner,
        scoreLoser,
    } = props.data

    return (
        <div className={styles.container}>
            <div>{winnerNick} </div>
            <img className={styles.img} src={winnerPfp} alt="winner avatar" />
            <div className={styles.score}>{scoreWinner}</div>
            <div> - </div>
            <div className={styles.score}>{scoreLoser}</div>
            <img className={styles.img} src={loserPfp} alt="loser avatar" />
            <div>{loserNick}</div>
        </div>
    )
}

export { MatchItem }
