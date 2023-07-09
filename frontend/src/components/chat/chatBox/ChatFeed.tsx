import Msg from './Msg'
import styles from './ChatFeed.module.css'


function ChatFeed() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Messages</h1>
            {/* {MSGS.map((msg) => (
                <Msg key={msg.id} msg={msg}></Msg>
            ))} */}
        </div>
    )
}

export default ChatFeed
