import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from './SeeMatchHistoryBtn'
import FriendList from './FriendList'
import Statistics from './Statistics'
import UserInformation from './UserInformation'
import PicturePlaceHolder from '../../assets/img/profil-picture-placeholder.png'

const MainProfile = () => {
    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserInformation
                        picture={PicturePlaceHolder}
                        name="Name placeholder"
                        level={42}
                        TFA={true}
                    />
                    <Statistics />
                    <SeeMatchHistoryBtn />
                </div>
                <div className={styles.bodyRightSide}>
                    <FriendList />
                </div>
            </div>
        </div>
    )
}

export default MainProfile
