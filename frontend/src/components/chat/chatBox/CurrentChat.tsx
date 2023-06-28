import styles from './CurrentChat.module.css'

function CurrentChat() {
    return (
            <div className={styles.currentChat}>
                <ul>
                    <li className={styles.activeCh}>#PongTrics</li>
                    <li className={styles.activeCh}>#My team</li>
                    <li className={styles.inactiveCh}>sbars</li>
                    <li className={styles.inactiveCh}>mpons</li>
                </ul>
            </div>
    )
}

export default CurrentChat
