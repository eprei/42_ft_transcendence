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

    const {
        match,
        player,
    } = styles;

    return (
        <div className={match}>
            <div className={player}>
                <span>{winnerNick} </span>
                <img src={winnerPfp} alt="winner avatar" />
                <span>Score {scoreWinner}</span>
            </div>
            <span className={styles.center_item}><strong>-</strong></span>
            <div className={player}>
                <span>Score: {scoreLoser}</span>
                <img src={loserPfp} alt="loser avatar" />
                <span>{loserNick}</span>
            </div>
        </div>
    )
}

export { MatchItem };