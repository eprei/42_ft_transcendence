import { useState, useEffect } from 'react'
import styles from './UserBox.module.css'
import User from './User'
import { io } from 'socket.io-client'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { RootState } from '../../../store'

const socket = io('http://localhost:8080')

function UserList() {
    const userData = useAppSelector(
        (state: RootState) => state.user.userData
    ) as UserData

    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number

    const getChUsers = () => {
        socket.emit(
            'findUsersByChannel',
            currentChatSelected,
            (response: any) => {
                // console.log(response)
                setUsers(response.users)
                response.owner.id === userData.user.id
                    ? setOwner(true)
                    : setOwner(false)
                response.admin.id === userData.user.id
                    ? setAdmin(true)
                    : setAdmin(false)
                // console.log(admin, owner)
                setAllInfo(response)
            }
        )
    }

    const createDM = (otherUserId: number) => {
        socket.emit(
            'createDM',
            userData.user.id,
            otherUserId,
            (response: any) => {
                if (response) {
                    // setChatId(response)
                    // alert(response)
                }
            }
        )
    }

    const blockUser = (otherUserId: number) => {
        socket.emit(
            'blockUser',
            userData.user.id,
            otherUserId,
            (response: any) => {
                if (response) {
                    // setChatId(response)
                }
            }
        )
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
        if (currentChatSelected) {
            getChUsers()
        } else setUsers([])
    }, [currentChatSelected])

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
                    createDM={createDM}
                    blockUser={blockUser}
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
