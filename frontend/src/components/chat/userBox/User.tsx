import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import IconInviteToPlay from '../../../assets/icon/invite_to_play.svg'
import IconBlocked from '../../../assets/icon/block_user.svg'
import { useState } from 'react'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { useAppDispatch } from '../../../store/types'
import { chatActions } from '../../../store/chat'

export interface UserProps {
    socket: Socket | undefined
    id: number
    nickname: string
    avatarUrl: string
    status: string
    amIowner: boolean
    amIadmin: boolean
    isOwner: boolean
    isAdmin: boolean
    isBlocked: boolean
    isBanned: boolean
    isMuted: boolean
    isDM: boolean
    handleOpenMenu: () => void
    handleCloseMenu: () => void
    openMenus: number
}

const User = ({
    socket,
    id,
    nickname,
    avatarUrl,
    status,
    amIowner,
    amIadmin,
    isOwner,
    isAdmin,
    isBlocked,
    isBanned,
    isMuted,
    isDM,
    handleOpenMenu,
    handleCloseMenu,
    openMenus,
}: UserProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const currentChatSelectedType = useAppSelector(
        (state) => state.chat.type
    ) as string
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number

    const createRoom = async (player_two: number) => {
        try {
            const response = await fetch('http://localhost:8080/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    theme: 'Theme 0',
                    player_two: player_two,
                }),
            })

            if (!response.ok) {
                console.log('Error creating room')
            } else {
                const room = await response.json()

                navigate('/game', {
                    state: {
                        player_one: room.player_one,
                        player_two: room.player_two,
                        theme: room.theme,
                        roomId: room.room_id,
                        imPlayerOne: true,
                    },
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const renderInviteToPlay = (playerId: number): JSX.Element | null => {
        if (status === 'online') {
            return (
                <img
                    src={IconInviteToPlay}
                    alt="Invite to Play Icon"
                    onClick={() => createRoom(playerId)}
                />
            )
        }
        return null
    }

    const [showContextMenu, setShowContextMenu] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({
        x: 0,
        y: 0,
    })

    const handleContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault()
        if (openMenus === 0) {
            handleOpenMenu()
            setShowContextMenu(true)
            setContextMenuPosition({
                x: event.clientX,
                y: event.clientY + window.scrollY,
            })
        }
    }

    const blockUser = () => {
        if (socket !== undefined) {
            socket.emit('blockUser', userData.user.id, id, () => {
                if (currentChatSelectedType === 'direct') {
                    dispatch(
                        chatActions.updateChat({
                            currentChatSelected: 0,
                            type: '',
                        })
                    )
                }
            })
        }
    }

    const unblockUser = () => {
        if (socket !== undefined) {
            socket.emit('unblockUser', userData.user.id, id, () => {})
        }
    }

    const setAdmin = () => {
        if (socket !== undefined) {
            socket.emit(
                'setAdmin',
                userData.user.id,
                id,
                currentChatSelected,
                () => {}
            )
        }
    }

    const unsetAdmin = () => {
        if (socket !== undefined) {
            socket.emit(
                'unsetAdmin',
                userData.user.id,
                id,
                currentChatSelected,
                () => {}
            )
        }
    }

    const kickUser = () => {
        if (socket !== undefined) {
            socket.emit(
                'kickUser',
                userData.user.id,
                id,
                currentChatSelected,
                () => {}
            )
        }
    }

    const banUser = () => {
        if (socket !== undefined) {
            socket.emit(
                'banUser',
                userData.user.id,
                id,
                currentChatSelected,
                () => {}
            )
        }
    }

    const unbanUser = () => {
        if (socket !== undefined) {
            socket.emit(
                'unbanUser',
                userData.user.id,
                id,
                currentChatSelected,
                () => {}
            )
        }
    }

    const muteUser = () => {
        if (socket !== undefined) {
            socket.emit(
                'muteUser',
                userData.user.id,
                id,
                currentChatSelected,
                () => {}
            )
        }
    }

    const createDM = () => {
        if (socket !== undefined) {
            socket.emit('createDM', userData.user.id, id, (response: any) => {
                if (response) {
                    setTimeout(() => {
                        dispatch(
                            chatActions.updateChat({
                                currentChatSelected: response.id,
                                type: 'direct',
                            })
                        )
                    }, 600)
                }
            })
        }
    }

    const handleContextMenuClose = () => {
        handleCloseMenu()
        setShowContextMenu(false)
    }

    let toggleBlockUser: JSX.Element | null = null
    if (id !== userData.user.id) {
        toggleBlockUser = isBlocked ? (
            <li onClick={unblockUser}>Unblock</li>
        ) : (
            <li onClick={blockUser}>Block</li>
        )
    }

    const contextMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                contextMenuRef.current &&
                !contextMenuRef.current.contains(event.target as Node)
            ) {
                handleContextMenuClose()
                handleCloseMenu()
            }
        }

        if (showContextMenu) {
            document.addEventListener('click', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [showContextMenu])

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img
                    src={isBlocked ? IconBlocked : avatarUrl}
                    alt="Avatar"
                    className={
                        isOwner
                            ? `${styles.profilePicture} ${styles.owner}`
                            : isAdmin
                            ? `${styles.profilePicture} ${styles.admin}`
                            : `${styles.profilePicture} ${styles.user}`
                    }
                    onClick={() =>
                        (window.location.href = `http://localhost:4040/user/${nickname}`)
                    }
                    onContextMenu={
                        id !== userData.user.id ? handleContextMenu : undefined
                    }
                />

                {showContextMenu && (
                    <div
                        ref={contextMenuRef}
                        className={styles.contextMenu}
                        style={{
                            top: contextMenuPosition.y,
                            left: contextMenuPosition.x,
                        }}
                        onClick={handleContextMenuClose}
                    >
                        <ul>
                            {toggleBlockUser}
                            {amIowner ? (
                                <ul>
                                    {isAdmin ? (
                                        <li onClick={unsetAdmin}>
                                            Remove admin
                                        </li>
                                    ) : (
                                        <li onClick={setAdmin}>Set admin</li>
                                    )}
                                    {!isBanned && !isDM && (
                                        <li onClick={kickUser}>Kick</li>
                                    )}
                                    {isBanned && !isDM && (
                                        <li onClick={unbanUser}>Unban</li>
                                    )}
                                    {!isBanned && !isDM && (
                                        <li onClick={banUser}>Ban</li>
                                    )}
                                    {!isMuted && (
                                        <li onClick={muteUser}>Mute</li>
                                    )}
                                </ul>
                            ) : (
                                amIadmin &&
                                !isOwner && (
                                    <ul>
                                        {!isBanned && (
                                            <li onClick={kickUser}>Kick</li>
                                        )}
                                        {isBanned ? (
                                            <li onClick={unbanUser}>Unban</li>
                                        ) : (
                                            <li onClick={banUser}>Ban</li>
                                        )}
                                        {!isMuted && (
                                            <li onClick={muteUser}>Mute</li>
                                        )}
                                    </ul>
                                )
                            )}
                        </ul>
                    </div>
                )}
                <div>
                    <h5>{nickname}</h5>
                    <p className={styles.status}>
                        {status === 'playing' ? 'playing' : ''}
                    </p>
                </div>
            </div>
            {id != userData.user.id && !isBlocked && (
                <div className={styles.right}>
                    <div>{renderInviteToPlay(id)}</div>
                    <div>
                        {!isDM && (
                            <img
                                src={IconMsg}
                                onClick={createDM}
                                alt="Message Icon"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default User
