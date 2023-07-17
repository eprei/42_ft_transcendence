import { useAppSelector } from "../store/types"
import { UserData } from "../types/UserData"
import styles from "./MatchHistory.module.css"

const MatchHistory = () => {
    const userData = useAppSelector((state) => state.user.userData) as UserData

    return (
        <div>
            <h1>Match History</h1>
            <p>logged user: {userData.user.nickname}</p>
            <img src={userData.user.avatarUrl}></img>
            <ul>
                <li>Match 1</li>
                <li>Match 2</li>
                <li>Match 3</li>
                <li>Match 4</li>
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
