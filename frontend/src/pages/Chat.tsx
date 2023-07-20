import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserList from '../components/chat/userBox/UserBox.tsx'

const Chat = () => {
    return (
        <div className={styles.chatContainer}>
            <ChannelBox />
            <ChatBox />
            <UserList />
        </div>
    )
}

export default Chat
