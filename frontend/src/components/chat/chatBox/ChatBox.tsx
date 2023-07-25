import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'
import { io } from 'socket.io-client'
import { useAppSelector } from '../../../store/types'

const socket = io('http://localhost:8080')

function ChatBox() {
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number

    return (
        <div className={styles.chatBox}>
            <ChatFeed socket={socket} />
            {currentChatSelected && <SendForm socket={socket} />}
        </div>
    )
}

export default ChatBox
