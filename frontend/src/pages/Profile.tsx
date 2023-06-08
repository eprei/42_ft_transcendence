import MainProfile from '../components/profile/MainProfile'
import styles from './Profile.module.css'

const Profile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <MainProfile />
            </div>
        </div>
    )
}

export default Profile
