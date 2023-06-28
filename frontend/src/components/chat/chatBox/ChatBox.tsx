import styles from './ChatBox.module.css'
import CurrentChat from './CurrentChat.tsx'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'

function ChatBox() {
    return (
        <div className={styles.chatBox}>
            <CurrentChat />
            <ChatFeed />
            <SendForm />
        </div>
    )
}

export default ChatBox
