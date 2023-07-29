import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import IconInviteToPlay from '../../../assets/icon/invite_to_play.svg'
import IconBlocked from '../../../assets/icon/block_user.svg'
// import IconBanned from '../../../assets/icon/lock.svg'
import { useState } from 'react'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { useEffect, useRef } from 'react'

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

    let inviteToPlay: JSX.Element | null = null
    if (status === 'online') {
        inviteToPlay = <img src={IconInviteToPlay} alt="Invite to Play Icon" />
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
            setContextMenuPosition({ x: event.clientX, y: event.clientY })
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
            // Comprobar si el clic se realizó fuera del menú contextual abierto
            if (
                contextMenuRef.current &&
                !contextMenuRef.current.contains(event.target as Node)
            ) {
                handleContextMenuClose()
                handleCloseMenu()
            }
        }

        // Agregar el listener de clic global cuando se muestra el menú contextual
        if (showContextMenu) {
            document.addEventListener('click', handleOutsideClick)
        }

        // Eliminar el listener cuando el componente se desmonta o el menú se cierra
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
                    className={styles.profilePicture}
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
                                <div>
                                    {isAdmin ? (
                                        <li onClick={unsetAdminHandler}>
                                            Remove admin
                                        </li>
                                    ) : (
                                        <li onClick={setAdminHandler}>
                                            {' '}
                                            Set admin
                                        </li>
                                    )}
                                    {isBanned ? null : (
                                        <li onClick={kickUserHandler}>Kick</li>
                                    )}
                                    {isBanned ? (
                                        <li onClick={unbanUserHandler}>
                                            Unban
                                        </li>
                                    ) : (
                                        <li onClick={banUserHandler}>Ban</li>
                                    )}
                                    {!isMuted ? (
                                        <li onClick={muteUserHandler}>Mute</li>
                                    ) : null}
                                </div>
                            ) : amIadmin && !isOwner ? (
                                <div>
                                    {isBanned ? null : (
                                        <li onClick={kickUserHandler}>Kick</li>
                                    )}
                                    {isBanned ? (
                                        <li onClick={unbanUserHandler}>
                                            Unban
                                        </li>
                                    ) : (
                                        <li onClick={banUserHandler}>Ban</li>
                                    )}
                                    {!isMuted ? (
                                        <li onClick={muteUserHandler}>Mute</li>
                                    ) : null}
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
                        {!isDM ? (
                            <img
                                src={IconMsg}
                                onClick={createDmHandler}
                                alt="Message Icon"
                            />
                        ) : null}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default User
