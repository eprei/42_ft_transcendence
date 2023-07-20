import { MatchData } from "../../types/MatchData";
import styles from "./MatchItem.module.css"

interface MatchProps {
    key: number,
    data: MatchData
}

const MatchItem = (props:MatchProps) => {
    const { 
        winnerPfp,
        winnerNick,
        loserPfp,
        loserNick,
        scoreWinner,
        scoreLoser
    } = props.data;

    return (
        <li>
            <div className={styles.match_item}>
                <div className={styles.match_info}>
                    <div className={styles.user_info}>
                        <img src={winnerPfp} alt="winner avatar" />
                        <span>Score {scoreWinner}</span>
                        <span>{winnerNick} </span>
                    </div>
                </div>
                <div className={styles.separator} />
                <div className={styles.match_info}>
                    <div className={styles.user_info}>
                        <span>Score: {scoreLoser}</span>
                        <span>{loserNick}</span>
                        <img src={loserPfp} alt="loser avatar" />
                    </div>
                </div>
            </div>
        </li>
    )
}

export { MatchItem };