import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'

function ChatBox() {
    return (
        <div className={styles.chatBox}>
            <ChatFeed />
            <SendForm />
        </div>
    )
}

export default ChatBox
