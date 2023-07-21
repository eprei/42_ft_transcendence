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
        winner,
        loser,
    } = styles;

    return (
        <li>
            <div className={match}>
                <div className={winner}>
                    <div>
                        <img src={winnerPfp} alt="winner avatar" />
                        <div>
                            <span>{winnerNick} </span>
                            <span>Score {scoreWinner}</span>
                        </div>
                    </div>
                </div>
                <div/>
                <div className={loser}>
                    <div>
                        <div>
                            <span>{loserNick}</span>
                            <span>Score: {scoreLoser}</span>
                        </div>
                        <img src={loserPfp} alt="loser avatar" />
                    </div>
                </div>
            </div>
        </li>
    )
}

export { MatchItem };