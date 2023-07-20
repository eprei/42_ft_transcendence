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

    let sendForm: JSX.Element | null = null
    if (currentChatSelected) {
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
