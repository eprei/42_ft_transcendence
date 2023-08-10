import styles from './UserBox.module.css'
import User from './User'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { RootState } from '../../../store'
import { useState } from 'react'
import { Socket } from 'socket.io-client'

interface UserBoxProps {
    socket: Socket | undefined
    users: any[]
    blockedUsers: number[]
    admins: any[]
    owner: any
    bannedUsers: any[]
    mutedUsers: number[]
    isDM: boolean
}

const UserBox = (props: UserBoxProps) => {
    const userData = useAppSelector(
        (state: RootState) => state.user.userData
    ) as UserData

    const [openMenus, setOpenMenus] = useState(0)

    const handleOpenMenu = () => {
        setOpenMenus(1)
        console.log('open menu = ', openMenus)
    }

    const handleCloseMenu = () => {
        console.log('close menu -> open = ', openMenus)
        setOpenMenus(0)
        console.log('close menu -> open = ', openMenus)
    }

    return (
        <div className={`${styles.usersBox}`}>
            <h2> online </h2>
            {props.users.map((user) =>
                user.status !== 'offline' ? (
                    <User
                        socket={props.socket}
                        key={user.id}
                        id={user.id}
                        nickname={user.nickname}
                        avatarUrl={user.avatarUrl}
                        status={user.status}
                        amIowner={props.owner.id === userData.user.id}
                        amIadmin={props.admins.some(
                            (admin) => admin.id === userData.user.id
                        )}
                        isOwner={props.owner.id === user.id}
                        isAdmin={props.admins.some(
                            (admin) => admin.id === user.id
                        )}
                        isBlocked={props.blockedUsers.some(
                            (blockedUser) => blockedUser === user.id
                        )}
                        isBanned={false}
                        isMuted={props.mutedUsers.some(
                            (mutedUser) => mutedUser === user.id
                        )}
                        isDM={props.isDM}
                        handleOpenMenu={handleOpenMenu}
                        handleCloseMenu={handleCloseMenu}
                        openMenus={openMenus}
                    />
                ) : null
            )}
            <h2> offline </h2>
            {props.users.map((user) =>
                user.status === 'offline' ? (
                    <User
                        socket={props.socket}
                        key={user.id}
                        id={user.id}
                        nickname={user.nickname}
                        avatarUrl={user.avatarUrl}
                        status={user.status}
                        amIowner={props.owner.id === userData.user.id}
                        amIadmin={props.admins.some(
                            (admin) => admin.id === userData.user.id
                        )}
                        isOwner={props.owner.id === user.id}
                        isAdmin={props.admins.some(
                            (admin) => admin.id === user.id
                        )}
                        isBlocked={props.blockedUsers.some(
                            (blockedUser) => blockedUser === user.id
                        )}
                        isBanned={false}
                        isMuted={props.mutedUsers.some(
                            (mutedUser) => mutedUser === user.id
                        )}
                        isDM={props.isDM}
                        handleOpenMenu={handleOpenMenu}
                        handleCloseMenu={handleCloseMenu}
                        openMenus={openMenus}
                    />
                ) : null
            )}
            <h2> banned </h2>
            {props.bannedUsers.map((banUser) => (
                <User
                    socket={props.socket}
                    key={banUser.id}
                    id={banUser.id}
                    nickname={banUser.nickname}
                    avatarUrl={banUser.avatarUrl}
                    status={banUser.status}
                    amIowner={props.owner.id === userData.user.id}
                    amIadmin={props.admins.some(
                        (admin) => admin.id === userData.user.id
                    )}
                    isOwner={props.owner.id === banUser.id}
                    isAdmin={props.admins.some(
                        (admin) => admin.id === banUser.id
                    )}
                    isBlocked={props.blockedUsers.some(
                        (blockedUser) => blockedUser === banUser.id
                    )}
                    isBanned={true}
                    isMuted={false}
                    isDM={props.isDM}
                    handleOpenMenu={handleOpenMenu}
                    handleCloseMenu={handleCloseMenu}
                    openMenus={openMenus}
                />
            ))}
        </div>
    )
}

export default UserBox
