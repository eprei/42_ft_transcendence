import React from 'react'
import styles from './Friend.module.css'
import IconAddFriend from '../../assets/icon/add_friend.svg'
import IconRemoveFriend from '../../assets/icon/remove_friend.svg'
import IconGenericPicture from '../../assets/icon/generic_picture.svg'
import ClickableIcon from './ClickableIcon'

export interface FriendProps {
    id: number
    name: string
    picture: string
    status: 'online' | 'offline' | 'playing'
    isFriend: boolean
}

const Friend: React.FC<FriendProps> = ({ name, picture, status, isFriend }) => {
    const getBorderColor = () => {
        if (!isFriend) return 'var(--color-black-grey)'
        switch (status) {
            case 'online':
                return 'var(--color-purple)'
            case 'offline':
                return 'var(--color-black-grey)'
            case 'playing':
                return 'var(--color-mid-green)'
            default:
                return 'var(--color-white)'
        }
    }

    const getOpacity = () => {
        switch (status) {
            case 'online':
                return '100%'
            case 'playing':
                return '100%'
            default:
                return '70%'
        }
    }

    const profilePictureStyle = {
        backgroundImage: isFriend
            ? `url(${picture})`
            : `url(${IconGenericPicture})`,
        backgroundSize: 'cover',
        borderColor: getBorderColor(),
        opacity: getOpacity(),
    }

    let statusColorClass = ''

    if (status === 'online') {
        statusColorClass = styles.online
    } else if (status === 'playing') {
        statusColorClass = styles.playing
    }

    const addFriend = () => {
        // function to be developed
        console.log('Friend added')
    }

    const removeFriend = () => {
        // function to be developed
        console.log('Friend removed')
    }

    return (
        <div className={styles.container}>
            <span>
                {isFriend ? (
                    <ClickableIcon
                        icon={IconRemoveFriend}
                        onClick={removeFriend}
                    />
                ) : (
                    <ClickableIcon icon={IconAddFriend} onClick={addFriend} />
                )}
            </span>
            <span
                className={styles.profilePicture}
                style={profilePictureStyle}
            ></span>
            <span className={styles.nameAndStatus}>
                <span className={styles.name}>{name}</span>
                {isFriend ? (
                    <span className={`${styles.status} ${statusColorClass}`}>
                        {status}
                    </span>
                ) : null}
            </span>
        </div>
    )
}

export default Friend
