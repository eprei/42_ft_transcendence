import styles from './UserInformation.module.css'
import ClickableIcon, { ClickableIconProps } from './ClickableIcon'
import IconEditProfile from '../../assets/icon/edit_profile.svg'
import switchButtonStyles from './SwitchButton.module.css'
import { useState } from 'react'
import { useAppSelector } from '../../store/types'
import { UserData } from '../../types/UserData'

const UserInformation = () => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const [TFAEnabled, setTFAEnabled] = useState(userData.user.TFAEnabled)
    const [newNickname, setNewNickname] = useState('')
    const [isEditingNickname, setIsEditingNickname] = useState(false)

    const editProfile = async () => {
        try {
            const response = await fetch(
                'http://localhost:8080/api/user/updatenickname',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nickname: newNickname }),
                }
            )

            if (response.ok) {
                console.log('Nickname updated successfully')
                // TODO update nickname in the front
            } else {
                console.error('Failed to update nickname')
            }
            setIsEditingNickname(false)
            setNewNickname('')
        } catch (error) {
            console.error('Error updating nickname:', error)
        }
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

    const handleNicknameClick = () => {
        setIsEditingNickname(true)
    }

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNickname(e.target.value)
    }

    const handleNicknameKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            editProfile()
        }
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.profilePicture}
                style={{
                    backgroundImage: `url(${userData.user.avatarUrl})`,
                    backgroundSize: 'cover',
                }}
            ></div>
            <div>
                <ul className={styles.verticalList}>
                    <li>
                        {isEditingNickname ? (
                            <input
                                type="text"
                                value={newNickname}
                                onChange={handleNicknameChange}
                                onKeyPress={handleNicknameKeyPress}
                            />
                        ) : (
                            <>
                                {userData.user.nickname}
                                <ClickableIcon
                                    icon={IconEditProfile}
                                    onClick={handleNicknameClick}
                                />
                            </>
                        )}
                    </li>
                    <li>Level {Math.floor(userData.user.nbVictory / 5) + 1}</li>
                    <li>
                        2fa is
                        {TFAEnabled ? ' activated ' : ' deactivated'}
                        <label className={switchButtonStyles.switch}>
                            <input
                                type="checkbox"
                                checked={TFAEnabled}
                                readOnly
                            />
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
