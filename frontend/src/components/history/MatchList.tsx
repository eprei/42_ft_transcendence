import { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/types'
import { UserData } from '../../types/UserData'
import { MatchData } from '../../types/MatchData'
import styles from './MatchList.module.css'

const MatchList = () => {
    const [matchHistory, setMatchHistory] = useState([])
    const userData = useAppSelector((state) => state.user.userData) as UserData

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
    }, [userData.user.id])

    const matchHistoryWinner = matchHistory.map((match: MatchData) => (
        <div className={styles.player}>
            <span>{match.winnerNick}</span>
            <img src={match.winnerPfp} alt="winner avatar" />
            <span>{match.scoreWinner}</span>
        </div>
    ))

    const matchHistoryLoser = matchHistory.map((match: MatchData) => (
        <div className={styles.player}  key={match.id}>
            <span>{match.scoreLoser}</span>
            <img src={match.loserPfp} alt="loser avatar" />
            <span>{match.loserNick}</span>
        </div>
    ))

    return (
        <>
            <div className={styles.match_list}>
                <div className={styles.left}>
                    <h3 className={styles.player}>Winner</h3>
                    {matchHistoryWinner}
                </div>
                <div className={styles.right}>
                    <h3 className={styles.player}>Loser</h3>
                    {matchHistoryLoser}
                </div>
            </div>
        </>
    )
}

export { MatchList }
