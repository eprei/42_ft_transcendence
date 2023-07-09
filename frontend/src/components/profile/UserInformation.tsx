import styles from './UserInformation.module.css'
import ClickableIcon from './ClickableIcon'
import IconEditProfile from '../../assets/icon/edit_profile.svg'
import { UserInformationProps } from './MainProfile'
import switchButtonStyles from './SwitchButton.module.css'
import { useState } from 'react'

const UserInformation = ({ userData }: UserInformationProps) => {
    const [TFAEnabled, setTFAEnabled] = useState(userData.user.TFAEnabled)

    const profilePictureStyle = {
        backgroundImage: `url(${userData.user.avatarUrl})`,
        backgroundSize: 'cover',
    }

    const editProfile = () => {
        // TODO implement this functionality in both the frontend and the backend
        console.log('Edit Profile')
    }

    const handleToggleSwitch = async () => {
        if (TFAEnabled) {
            try {
                const response = await fetch(
                    'http://localhost:8080/api/auth/2fa/turn-off',
                    {
                        method: 'POST',
                        credentials: 'include',
                    }
                )
                if (response.ok) {
                    console.log('2FA turned off')
                    setTFAEnabled(false)
                }
            } catch (error) {
                console.error('Error turning off 2FA:', error)
            }
        } else {
            window.location.href = 'http://localhost:4040/TFATurnOn'
        }
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
                        {userData.user.nickname}
                        <ClickableIcon
                            icon={IconEditProfile}
                            onClick={editProfile}
                        />
                    </li>
                    <li>Level {Math.floor(userData.user.nbVictory / 5) + 1}</li>
                    <li>
                        2fa is
                        {userData.user.TFAEnabled
                            ? ' activated '
                            : ' deactivated'}
                        <label className={switchButtonStyles.switch}>
                            <input type="checkbox" checked={TFAEnabled} />
                            <span
                                className={switchButtonStyles.slider}
                                onClick={handleToggleSwitch}
                            ></span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserInformation
