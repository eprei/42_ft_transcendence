import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import styles from './UserBox.module.css'
import User from './User'
import { chatIdAtom } from '../channelBox/ChannelLi'
import { io } from 'socket.io-client'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { RootState } from '../../../store'

function UserList() {
    const socket = io('http://localhost:8080')
    const userData = useAppSelector(
        (state: RootState) => state.user.userData
    ) as UserData

    const [chatId] = useAtom(chatIdAtom)

    const getChUsers = () => {
        socket.emit('findUsersByChannel', chatId, (response: any) => {
            console.log(response)
            setUsers(response.users)
            response.owner.id === userData.user.id
                ? setOwner(true)
                : setOwner(false)
            response.admin.id === userData.user.id
                ? setAdmin(true)
                : setAdmin(false)
            console.log(admin, owner)
            setAllInfo(response)
        })
    }

    const [allInfo, setAllInfo] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [admin, setAdmin] = useState<boolean>(false)
    const [owner, setOwner] = useState<boolean>(false)

    const work = () => {
        if (allInfo) {
            alert(JSON.stringify(allInfo, null, 2))
        }
    }

    useEffect(() => {
        if (chatId) {
            getChUsers()
        } else setUsers([])
    }, [chatId])

    return (
        <div className={`${styles.usersBox}`}>
            <h2 onClick={work}> online </h2>
            {users.map((user) => (
                <User
                    key={user.id}
                    id={user.id}
                    nickname={user.nickname}
                    avatarUrl={user.avatarUrl}
                    isOwner={owner}
                    isAdmin={admin}
                />
            ))}
            {/* <h2> online  </h2>
            {users.map((user) =>
                user.isOnline ? <User key={user.id} user={user} /> : null
            )}
            <h2> offline </h2>
            {users.map((user) =>
                !user.isOnline ? <User key={user.id} user={user} /> : null
            )}  */}
        </div>
    )
}

export default UserList
