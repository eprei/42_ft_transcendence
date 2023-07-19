import { useEffect, useState } from "react"
import { useAppSelector } from "../store/types"
import { UserData } from "../types/UserData"
import styles from "./MatchHistory.module.css"

const MatchHistory = () => {
    const [matchHistory, setMatchHistory] = useState([]);
    // const [loading, setLoading] = useState(true);
    const userData = useAppSelector((state) => state.user.userData) as UserData

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/match/user/`,
                    { credentials: "include" }
                );
                const resjson = await res.json();
                setMatchHistory(resjson);
                // setLoading(false);
                console.log(resjson);

            } catch (error) {
                // setLoading(false);
                console.log(error);
            };
        };
        fetchMatches();
    }, [userData.user.id]);
    
    const matchHistoryList = matchHistory.map((match : any) => (
        <li key={match.id} className={styles.container}>
            {match.winner?.nickname} beat {match.loser?.nickname}
        </li>
    ));

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    
    return (
        <div>
            <h1>Match History</h1>
            <ul className={styles.card}>
                {matchHistoryList}
            </ul>
        </div>
    )
}

export default MatchHistory
