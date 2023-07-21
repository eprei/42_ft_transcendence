import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserList from '../components/chat/userBox/UserBox.tsx'
import { userActions } from '../store/user'
import { useAppDispatch } from '../store/types'
import { UserData } from '../types/UserData'
import { useLoaderData } from 'react-router-dom'

const Chat = () => {
    const fetchUserData = useLoaderData() as UserData
    const dispatch = useAppDispatch()
    dispatch(userActions.update({ user: fetchUserData }))
    return (
        <div className={styles.chatContainer}>
            <ChannelBox />
            <ChatBox />
            <UserList />
        </div>
    )
}

export default Chat

export async function loader() {
    const response = await fetch(`http://localhost:8080/api/user/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching user data' })
        )
    }

    const data = await response.json()
    return data
}