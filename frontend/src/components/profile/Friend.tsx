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

const Friend = ({ name, picture, status, isFriend }: FriendProps) => {
    const getBorderColor = () => {
        if (!isFriend) return 'var(--color-black-grey)'
        switch (status) {
            case 'online':
                return 'var(--color-purple)'
            case 'playing':
                return 'var(--color-mid-green)'
            case 'offline':
                return 'var(--color-black-grey)'
        }
    }

    const getOpacity = () => {
        switch (status) {
            case 'online':
                return '100%'
            case 'playing':
                return '100%'
            case 'offline':
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
        // TODO addFriend backend side
        console.log('Friend added')
    }

    const removeFriend = () => {
        // TODO removeFriend backend side
        console.log('Friend removed')
    }

    return (
        <div className={styles.container}>
            <div>
                {
                    <ClickableIcon
                        icon={isFriend ? IconRemoveFriend : IconAddFriend}
                        onClick={isFriend ? removeFriend : addFriend}
                    />
                }
            </div>
            <div
                className={styles.profilePicture}
                style={profilePictureStyle}
            ></div>
            <div className={styles.nameAndStatus}>
                <h3>{name}</h3>
                <p className={`${styles.status} ${statusColorClass}`}>
                    {status}
                </p>
            </div>
        </div>
    )
}

export default Friend
