import React from 'react'
import styles from './UserInformation.module.css'
import ClickableIcon from './ClickableIcon'
import IconEditProfile from '../../assets/icon/edit_profile.svg'

interface UserInformation {
    picture: string
    name: string
    level: number
    TFA: boolean
}

const UserInformation = ({ picture, name, level, TFA }: UserInformation) => {
    const profilePictureStyle = {
        backgroundImage: `url(${picture})`,
        backgroundSize: 'cover',
    }

    const editProfile = () => {
        // function to be developed
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
                        {name}
                        <ClickableIcon
                            icon={IconEditProfile}
                            onClick={editProfile}
                        />
                    </li>
                    <li>Level {level}</li>
                    <li>
                        Two-factor authentication is
                        {TFA ? ' activated ' : ' deactivated'}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserInformation
