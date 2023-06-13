import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from './SeeMatchHistoryBtn'
import FriendList from './FriendList'
import Statistics from './Statistics'
import UserInformation from './UserInformation'
import PicturePlaceHolder from '../../assets/img/profil-picture-placeholder.png'

const MainProfile = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.title}>Profile</div>
                <div className={styles.body}>
                    <div className={styles.bodyLeftSide}>
                        <div>
                            <UserInformation
                                picture={PicturePlaceHolder}
                                name="Name placeholder"
                                level={42}
                                TFA={true}
                            />
                        </div>
                        <div>
                            <Statistics />
                        </div>
                        <div>
                            <SeeMatchHistoryBtn />
                        </div>
                    </div>
                    <div className={styles.bodyRightSide}>
                        <FriendList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProfile
