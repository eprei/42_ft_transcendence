import styles from './Chat.module.css'
import ChannelBox from '../components/chat/ChannelBox.tsx'
import ChatBox from '../components/chat/ChatBox'
import UserList from '../components/chat/UserBox.tsx'

const Chat = () => {
    return (
        <>
            <div className={styles.chatContainer}>
                <ChannelBox />
                <ChatBox />
                <UserList />
            </div>
        </>
    )
}

export default Chat
