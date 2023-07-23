import styles from './Friend.module.css'
import IconRemoveFriend from '../../assets/icon/remove_friend.svg'
import ClickableIcon from './ClickableIcon'
import IconAcceptFriend from '../../assets/icon/accept_friend.svg'
import { useState } from 'react'

import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })

    return (
        <div>
            <Link
                style={{ textDecoration: match ? 'underline' : 'none' }}
                to={to}
                {...props}
            >
                {children}
            </Link>
            {match && ' (active)'}
        </div>
    )
}

export interface FriendProps {
    id: number
    nickname: string
    avatarUrl: string
    status: 'online' | 'offline' | 'playing'
    isPending: boolean
    createdByMe: boolean
}

const Friend = ({
    id,
    nickname,
    avatarUrl,
    status,
    isPending,
    createdByMe,
}: FriendProps) => {
    const getBorderColor = () => {
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
        backgroundImage: `url(${avatarUrl})`,
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

    const [successfullyDone, setSuccessfullyDone] = useState(false)

    const removeFriendship = async (id: number) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/friend/delete/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Error deleting friendhip')
            }
            setSuccessfullyDone(true)
        } catch (error) {
            console.error(error)
        }
        console.log('Friendship removed sucsefully')
    }

    const acceptFriendship = async (id: number) => {
        try {
            const updateFriendDto = {
                isPending: false,
            }

            const response = await fetch(
                `http://localhost:8080/api/friend/accept/${id}`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateFriendDto),
                }
            )

            if (!response.ok) {
                throw new Error('Error accepting friendhip')
            }
            setSuccessfullyDone(true)
        } catch (error) {
            console.error(error)
        }
        console.log('Friend sucsefully accepted')
    }

    return (
        <div className={styles.container}>
            {!successfullyDone ? (
                <>
                    <div>
                        {isPending && !createdByMe && (
                            <span title="reject friend request">
                                {' '}
                                <ClickableIcon
                                    icon={IconRemoveFriend}
                                    onClick={() => removeFriendship(id)}
                                ></ClickableIcon>{' '}
                            </span>
                        )}
                        <span
                            title={
                                isPending
                                    ? createdByMe
                                        ? 'remove friendship request'
                                        : 'accept friendship request'
                                    : 'remove friendship'
                            }
                        >
                            <ClickableIcon
                                icon={
                                    isPending
                                        ? createdByMe
                                            ? IconRemoveFriend
                                            : IconAcceptFriend
                                        : IconRemoveFriend
                                }
                                onClick={
                                    isPending
                                        ? createdByMe
                                            ? () => removeFriendship(id)
                                            : () => acceptFriendship(id)
                                        : () => removeFriendship(id)
                                }
                            ></ClickableIcon>
                        </span>
                    </div>
                    <div
                        className={styles.profilePicture}
                        style={profilePictureStyle}
                    ></div>
                    <div className={styles.nameAndStatus}>
                        <CustomLink to={`/user/${nickname}`}>
                            <h3>{nickname}</h3>
                        </CustomLink>
                        <p className={`${styles.status} ${statusColorClass}`}>
                            {status}
                        </p>
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Friend
