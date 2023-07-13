import styles from './UserLambdaInformation.module.css'
import { UserInformationProps } from '../../pages/MainProfile'

const UserLambdaInformation = ({ userData }: UserInformationProps) => {
    const profilePictureStyle = {
        backgroundImage: `url(${userData.user.avatarUrl})`,
        backgroundSize: 'cover',
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.profilePicture}
                style={profilePictureStyle}
            ></div>
            <div>
                <ul className={styles.verticalList}>
                    <li>{userData.user.nickname}</li>
                    <li>Level {Math.floor(userData.user.nbVictory / 5) + 1}</li>
                </ul>
            </div>
        </div>
    )
}

export default UserLambdaInformation
