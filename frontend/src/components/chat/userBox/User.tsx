import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import { useState } from 'react'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

export interface UserProps {
    id: number
    nickname: string
    avatarUrl: string
    isOwner: boolean
    isAdmin: boolean
    createDM: (otherUserId: number) => void
    blockUser: (otherUserId: number) => void
}

const User = ({
    id,
    nickname,
    avatarUrl,
    isOwner,
    isAdmin,
    createDM,
    blockUser,
}: UserProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const myId = userData.user.id

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

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img // {isBlocked ? (src={IconBlocked}) : (src={avatarUrl})}
                    src={avatarUrl}
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
                            <li onClick={blockUserHandler}>Block</li>
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
                </div>
            </div>

            {id != myId ? (
                <div className={styles.right}>
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
