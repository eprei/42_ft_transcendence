import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import CurrentChat from './CurrentChat.tsx'

function ChatBox() {
    return (
        <>
            <div className={`${styles.chatBox}`}>
                <CurrentChat />
                <ChatFeed />
                {/* <SendForm /> */}
            </div>
        </>
    )
}

export default ChatBox
