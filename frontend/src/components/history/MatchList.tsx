import { useEffect, useState } from "react";
import { MatchItem } from "./MatchItem";
import { useAppSelector } from "../../store/types";
import { UserData } from "../../types/UserData"
import { MatchData } from "../../types/MatchData";
import styles from "./MatchList.module.css"


const MatchList = () => {
    const [matchHistory, setMatchHistory] = useState([]);
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
                console.log(resjson);

            } catch (error) {
                console.log(error);
            };
        };
        fetchMatches();
    }, [userData.user.id]);

    const matchHistoryList = matchHistory.map((match : MatchData) => (
        <MatchItem key={match.id} data={match}/>
    ));

    return (
        <div className={styles.match_list}>
            <h2>Score</h2>
            {matchHistoryList}
        </div>
    );
};

export { MatchList, MatchItem };