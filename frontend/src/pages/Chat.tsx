import styles from '../components/chat/Chat.module.css'
import ChatBox from '../components/chat/ChatBox'
import ChannelList from '../components/chat/ChannelList.tsx'
import UserList from '../components/chat/UserList.tsx'

const Chat = () => {
    return (
        <>
            <div className={styles.chatContainer}>
                <ChannelList />
                <ChatBox />
                <UserList />
            </div>
        </>
    )
}

export default Chat
