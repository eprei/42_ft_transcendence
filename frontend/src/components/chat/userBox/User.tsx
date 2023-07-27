import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import IconInviteToPlay from '../../../assets/icon/invite_to_play.svg'
import IconBlocked from '../../../assets/icon/block_user.svg'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

export interface UserProps {
    id: number
	nickname: string
    avatarUrl: string
    isOwner: boolean
    isAdmin: boolean
	status: string
    createDM: (otherUserId: number) => void
    blockUser: (otherUserId: number) => void
    unblockUser: (otherUserId: number) => void
	blockedUsers: number[]
}

const User = ({
    id,
    nickname,
    avatarUrl,
    isOwner,
    isAdmin,
	status,
    createDM,
    blockUser,
	unblockUser,
	blockedUsers,
}: UserProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const myId = userData.user.id

  	let inviteToPlay: JSX.Element | null = null
    if (status === 'online') {
        inviteToPlay = <img src={IconInviteToPlay} alt="Invite to Play Icon" />
    }

	const [isBlocked, setIsBlocked] = useState<boolean>(false)
	
	useEffect(() => {
		if (blockedUsers.includes(id)) {
			setIsBlocked(true)
		} else {
			setIsBlocked(false)
		}
	}, [blockedUsers])

    const createDmHandler = () => {
        createDM(id)
    }

    const [showContextMenu, setShowContextMenu] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
    })

    const handleContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault()
        setShowContextMenu(true)
        setContextMenuPosition({ x: event.clientX, y: event.clientY })
    }

    const handleContextMenuClose = () => {
        setShowContextMenu(false)
    }

    const blockUserHandler = () => {
        blockUser(id)
    }

    const unblockUserHandler = () => {
        unblockUser(id)
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img 
					src={isBlocked? IconBlocked : avatarUrl}
                    alt="Avatar"
                    className={styles.profilePicture}
                    onClick={() =>
                        (window.location.href = `http://localhost:4040/user/${nickname}`)
                    }
                    onContextMenu={handleContextMenu}
                />

                {showContextMenu && (
                    <div
                        className={styles.contextMenu}
                        style={{
                            top: contextMenuPosition.y,
                            left: contextMenuPosition.x,
                        }}
                        onClick={handleContextMenuClose}
                    >
                        <ul>
							{isBlocked? <li onClick={unblockUserHandler}>Unblock</li>
							: <li onClick={blockUserHandler}>Block</li>}

                            {isOwner ? (
                                <div>
                                    <li>Set admin</li>
                                    <li>Remove admin</li>
                                    <li>Kick</li>
                                    <li>Ban</li>
                                    <li>Silent</li>
                                </div>
                            ) : null}
                            {isAdmin && !isOwner ? (
                                <div>
                                    <li>Kick</li>
                                    <li>Ban</li>
                                    <li>Silent</li>
                                </div>
                            ) : null}
                        </ul>
                    </div>
                )}

				<div>
                    <h5>{nickname}</h5>
                    <p className={styles.status}>
                        {status === 'playing' ? 'playing' : ''}{' '}
                    </p>
                </div>
            </div>

            {id != myId ? (
                <div className={styles.right}>
					<div>{inviteToPlay}</div>
                    <div>
                        <img
                            src={IconMsg}
                            onClick={createDmHandler}
                            alt="Message Icon"
                        />
                    </div>
					
                </div>
            ) : null}
        </div>
    )
}

export default User
