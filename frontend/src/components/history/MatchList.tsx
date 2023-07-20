import { useEffect, useState } from "react";
import { MatchItem } from "./MatchItem";
import { useAppSelector } from "../../store/types";
import { UserData } from "../../types/UserData"


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

    const matchHistoryList = matchHistory.map((match : any) => (
        <MatchItem match={match} />
    ));

    return (
        <ul>
            {matchHistoryList}
        </ul>
    );
};

export { MatchList };