import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import IconInviteToPlay from '../../../assets/icon/invite_to_play.svg'
import IconBlocked from '../../../assets/icon/block_user.svg'
import { useState } from 'react'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export interface UserProps {
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
    createDM: (otherUserId: number) => void
    blockUser: (otherUserId: number) => void
    unblockUser: (otherUserId: number) => void
    setAdmin: (targetUserId: number) => void
    unsetAdmin: (targetUserId: number) => void
    kickUser: (targetUserId: number) => void
    banUser: (targetUserId: number) => void
    unbanUser: (targetUserId: number) => void
    muteUser: (targetUserId: number) => void
    isDM: boolean
    handleOpenMenu: () => void
    handleCloseMenu: () => void
    openMenus: number
}

const User = ({
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
    createDM,
    blockUser,
    unblockUser,
    setAdmin,
    unsetAdmin,
    kickUser,
    banUser,
    unbanUser,
    muteUser,
    isDM,
    handleOpenMenu,
    handleCloseMenu,
    openMenus,
}: UserProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const myId = userData.user.id
    const navigate = useNavigate()

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

    const handleContextMenuClose = () => {
        handleCloseMenu()
        setShowContextMenu(false)
    }

    const blockUserHandler = () => {
        blockUser(id)
    }

    const unblockUserHandler = () => {
        unblockUser(id)
    }

    let toggleBlockUser: JSX.Element | null = null
    if (id !== myId) {
        toggleBlockUser = isBlocked ? (
            <li onClick={unblockUserHandler}>Unblock</li>
        ) : (
            <li onClick={blockUserHandler}>Block</li>
        )
    }

    const createDmHandler = () => {
        createDM(id)
    }

    const setAdminHandler = () => {
        setAdmin(id)
    }

    const unsetAdminHandler = () => {
        unsetAdmin(id)
    }

    const kickUserHandler = () => {
        kickUser(id)
    }

    const banUserHandler = () => {
        banUser(id)
    }

    const unbanUserHandler = () => {
        unbanUser(id)
    }

    const muteUserHandler = () => {
        muteUser(id)
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
                    onContextMenu={id !== myId ? handleContextMenu : undefined}
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
                                        <li onClick={unsetAdminHandler}>
                                            Remove admin
                                        </li>
                                    ) : (
                                        <li onClick={setAdminHandler}>
                                            Set admin
                                        </li>
                                    )}
                                    {!isBanned && (
                                        <li onClick={kickUserHandler}>Kick</li>
                                    )}
                                    {isBanned ? (
                                        <li onClick={unbanUserHandler}>
                                            Unban
                                        </li>
                                    ) : (
                                        <li onClick={banUserHandler}>Ban</li>
                                    )}
                                    {!isMuted && (
                                        <li onClick={muteUserHandler}>Mute</li>
                                    )}
                                </ul>
                            ) : (
                                amIadmin &&
                                !isOwner && (
                                    <ul>
                                        {!isBanned && (
                                            <li onClick={kickUserHandler}>
                                                Kick
                                            </li>
                                        )}
                                        {isBanned ? (
                                            <li onClick={unbanUserHandler}>
                                                Unban
                                            </li>
                                        ) : (
                                            <li onClick={banUserHandler}>
                                                Ban
                                            </li>
                                        )}
                                        {!isMuted && (
                                            <li onClick={muteUserHandler}>
                                                Mute
                                            </li>
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
            {id != myId && !isBlocked && (
                <div className={styles.right}>
                    <div>{renderInviteToPlay(id)}</div>
                    <div>
                        {!isDM && (
                            <img
                                src={IconMsg}
                                onClick={createDmHandler}
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
