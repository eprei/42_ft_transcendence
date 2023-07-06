import styles from './UserInformation.module.css'
import ClickableIcon from './ClickableIcon'
import IconEditProfile from '../../assets/icon/edit_profile.svg'
import { UserInformationProps } from './MainProfile'

const UserInformation = ( {userData}: UserInformationProps ) => {
    const profilePictureStyle = {
        backgroundImage: `url(${userData.avatarUrl})`,
        backgroundSize: 'cover',
    }

    const editProfile = () => {
        // TODO implement this functionality in both the frontend and the backend
        console.log('Edit Profile')
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.profilePicture}
                style={profilePictureStyle}
            ></div>
            <div>
                <ul className={styles.verticalList}>
                    <li>
                        {userData.login}
                        <ClickableIcon
                            icon={IconEditProfile}
                            onClick={editProfile}
                        />
                    </li>
                    <li>Level {userData.nbVictory}</li> {/* // TODO CHANGE THIS VALUE WITH THE CALCULE OF LEVEL */}
                    <li>
                        Two-factor authentication is
                        {userData.TFAEnabled ? ' activated ' : ' deactivated'}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserInformation
