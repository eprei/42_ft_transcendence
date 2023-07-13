import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserList from '../components/chat/userBox/UserBox.tsx'
// import { useAtom } from 'jotai'
// import { chatIdAtom } from '../components/chat/channelBox/ChannelLi.tsx'

const Chat = () => {
    // const [chatId, setChatId] = useAtom(chatIdAtom);
    // const resetChatId = () => {
    // 	if (chatId != 0)
    // 	setChatId(0)
    // }

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
