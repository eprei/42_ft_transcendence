import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from './SeeMatchHistoryBtn'
import FriendList from './FriendList'
import Statistics from './Statistics'
import UserInformation from './UserInformation'

const MainProfile = () => {
    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.title}>Profile</div>
                    <div className={styles.body}>
                        <div className={styles.bodyLeftSide}>
                            <div className={styles.nameAndLevel}><UserInformation></UserInformation></div>
                            <div className={styles.statistics}><Statistics></Statistics></div>
                            <div className={styles.matchHistory}><SeeMatchHistoryBtn></SeeMatchHistoryBtn></div>
                        </div>
                        <div className={styles.bodyRightSide}>
                            <div className={styles.friendsList}><FriendList></FriendList></div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default MainProfile
