import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import styles from './UserBox.module.css'
import User from './User'
import { chatIdAtom } from '../channelBox/ChannelLi'


function UserList() {

	const [chatId] = useAtom(chatIdAtom)

	async function getChUsers() {
		try {
			const response = await fetch(
				`http://localhost:8080/api/channel/${chatId}/users`,
				{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
				)

			if (!response.ok) {
				throw new Error('Failed to fetch current channel users')
			}
	
			const channel = await response.json()
			return channel.users;
		} catch (error) {
			console.error(error)
		}
	}

	const [users, setUsers] = useState<any[]>([])

	useEffect(() => {
		if (chatId)
			getChUserHandler()
		else
			setUsers([])
	}, [chatId]) 

	const getChUserHandler = () => {
        getChUsers().then((users) => {
            setUsers(users)
        })
    }

    return (
        <div className={`${styles.usersBox}`}>
            <h2> online  </h2>
			{users.map((user) => (
				<User 
				  key={user.id}
				  id={user.id}
    			  nickname={user.nickname}
    			  avatarUrl={user.avatarUrl}
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
