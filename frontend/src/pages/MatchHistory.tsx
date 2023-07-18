import { useEffect, useState } from "react"
import { useAppSelector } from "../store/types"
import { UserData } from "../types/UserData"
import styles from "./MatchHistory.module.css"

const MatchHistory = async () => {
    const userData = useAppSelector((state) => state.user.userData) as UserData

    const res = await fetch(`http://localhost:8080/api/match/user/${userData.user.id}`);
    const matchHistory = await res.json();

    console.log(matchHistory);

    const matchHistoryList = matchHistory.map((match : any) => (
        <li key={match.id}>
            {match.winner.nickname} beat {match.loser.nickname}
        </li>
    ));
    

    return (
        <div>
            <h1>Match History</h1>
            <p>logged user: {userData.user.nickname}</p>
            <img src={userData.user.avatarUrl}></img>
            <ul>
                {matchHistoryList}    
            </ul>
            <div className={styles.card}>
                {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
                <div className={styles.container}>
                    <h4><b>John Doe</b></h4>
                    <p>Architect & Engineer</p>
                </div>
            </div> 
        </div>
    )
}

export default MatchHistory
