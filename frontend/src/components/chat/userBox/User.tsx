import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import { useState } from 'react'
import { io } from 'socket.io-client'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

export interface UserProps {
    id: number
    nickname: string
    avatarUrl: string
    isOwner: boolean
    isAdmin: boolean
}

const socket = io('http://localhost:8080')

const User = ({ id, nickname, avatarUrl, isOwner, isAdmin }: UserProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const myId = userData.user.id

    const createDM = () => {
        socket.emit('createDM', myId, id, (response: any) => {
            if (response) {
                // setChatId(response)
                // alert(response)
            }
        })
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

	const blockUser = () => {
		socket.emit('blockUser', myId, id, (response: any) => {
			if (response) {
				// setChatId(response)
			}
		})
	}

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img
				  // {isBlocked ? (src={IconBlocked}) : (src={avatarUrl})}
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
                            <li onClick={blockUser}>Block</li>
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
                            onClick={createDM}
                            alt="Message Icon"
                        />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default User
