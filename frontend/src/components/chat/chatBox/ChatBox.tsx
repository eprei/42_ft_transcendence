import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'
import { io } from 'socket.io-client'
import { chatIdAtom } from '../channelBox/ChannelLi'
import { useAtom } from 'jotai'

const socket = io('http://localhost:8080')

function ChatBox() {
    const [chatId] = useAtom(chatIdAtom)
    let sendForm: JSX.Element | null = null
    if (chatId) {
        sendForm = <SendForm socket={socket} />
    }

    return (
        <div className={styles.chatBox}>
            <ChatFeed socket={socket} />
            {sendForm}
        </div>
    )
}


export default ChatBox
