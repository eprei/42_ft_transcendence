import styles from './OtherUsers.module.css'
import IconAddFriend from '../../assets/icon/add_friend.svg'
import ClickableIcon from './ClickableIcon'
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

export interface OtherUserProps {
    id: number
    nickname: string
    avatarUrl: string
}

const OtherUser = ({ id, nickname, avatarUrl }: OtherUserProps) => {
    const profilePictureStyle = {
        backgroundImage: `url(${avatarUrl})`,
        backgroundSize: 'cover',
    }

    const [successfullyDone, setSuccessfullyDone] = useState(false)

    const sendFriendRequest = async (id: number) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/friend/create/${id}`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Error sending friendhip request')
            }
            setSuccessfullyDone(true)
        } catch (error) {
            console.error(error)
        }
        console.log('Friendship request successfully sent')
    }

    return (
        <div className={styles.container}>
            {!successfullyDone ? (
                <>
                    <div>
                        <span title={'Send friend request'}>
                            <ClickableIcon
                                icon={IconAddFriend}
                                onClick={() => sendFriendRequest(id)}
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
                    </div>
                </>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default OtherUser
