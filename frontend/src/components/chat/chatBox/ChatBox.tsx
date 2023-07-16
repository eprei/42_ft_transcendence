import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

function ChatBox() {
    return (
        <div className={styles.chatBox}>
            <ChatFeed socket={socket}/>
            <SendForm socket={socket}/>
        </div>
    )
}

export default ChatBox
