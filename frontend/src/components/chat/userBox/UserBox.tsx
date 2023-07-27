import { useState, useEffect } from 'react'
import styles from './UserBox.module.css'
import User from './User'
import { io } from 'socket.io-client'
import { useAppSelector, useAppDispatch } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { RootState } from '../../../store'
import { chatActions } from '../../../store/chat'

const socket = io('http://localhost:8080')

function UserList() {
    const userData = useAppSelector(
        (state: RootState) => state.user.userData
    ) as UserData

    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number

	const dispatch = useAppDispatch()
    const getChUsers = () => {
        socket.emit(
            'findUsersByChannel',
            currentChatSelected,	
            (response: any) => {
                setUsers(response.users)
				setOwner(response.owner.id === userData.user.id)
				setAdmin(false)
				response.admin.map((admin: any) => {
					if (admin.id === userData.user.id) setAdmin(true)
				})
                console.log(admin, owner)
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
					setTimeout(() => {
					dispatch(chatActions.selectChat(response.id))
					}, 1000)	
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
            {users.map((user) =>
                user.status !== 'offline' ? <User
				key={user.id}
				id={user.id}
				nickname={user.nickname}
				avatarUrl={user.avatarUrl}
				isOwner={owner}
				isAdmin={admin}
				status={user.status}
				createDM={createDM}
				blockUser={blockUser}
			/> : null
            )}
            <h2> offline </h2>
            {users.map((user) =>
                user.status === 'offline' ? <User
				key={user.id}
				id={user.id}
				nickname={user.nickname}
				avatarUrl={user.avatarUrl}
				isOwner={owner}
				isAdmin={admin}
				status={user.status}
				createDM={createDM}
				blockUser={blockUser}
			/> : null
			)}
        </div>
    )
}

export default UserList
