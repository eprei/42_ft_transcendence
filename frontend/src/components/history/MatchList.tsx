import { useEffect, useState } from 'react'
import { MatchData } from '../../types/MatchData'
import styles from './MatchList.module.css'

const MatchList = () => {
    const [matchHistory, setMatchHistory] = useState<MatchData[]>([])

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/match/user/`,
                    { credentials: 'include' }
                )
                const resjson = await res.json()
                setMatchHistory(resjson)
                console.log(resjson)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMatches()
    })

    const matchHistoryWinner = matchHistory.map((match: MatchData) => (
        <div className={styles.left} key={match.id}>
            <span>{match.winnerNick}</span>
            <img src={match.winnerPfp} alt="winner avatar" />
            <span>{match.scoreWinner}</span>
        </div>
    ))

    const matchHistoryLoser = matchHistory.map((match: MatchData) => (
        <div className={styles.right} key={match.id}>
            <span>{match.scoreLoser}</span>
            <img src={match.loserPfp} alt="loser avatar" />
            <span>{match.loserNick}</span>
        </div>
    ))

    return (
        <>
            <div className={styles.match_list}>
                <div className={styles.player}>
                    <h3 className={styles.left}>Winner</h3>
                    {matchHistoryWinner}
                </div>
                <div className={styles.player}>
                    <h3 className={styles.right}>Loser</h3>
                    {matchHistoryLoser}
                </div>
            </div>
        </>
    )
}

export { MatchList }
