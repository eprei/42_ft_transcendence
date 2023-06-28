import styles from './Msg.module.css'

export interface MsgProps {
    id: number
    name: string
    picture: string
    text: string
}

const Msg = ({ msg }: { msg: MsgProps }) => {
    return (
        <>
            {msg.name === 'rburri' ? (
                <div className={`${styles.msgContainer} ${styles.me}`}>
                    <div className={styles.textContainer}>
                        <p className={styles.me}>
                            <b>{msg.name} : </b> {msg.text}
                        </p>
                    </div>
                    <img
                        src={msg.picture}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                </div>
            ) : (
                <div className={`${styles.msgContainer} ${styles.they}`}>
                    <img
                        src={msg.picture}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                    <div className={styles.textContainer}>
                        <p className={styles.they}>
                            <b>{msg.name} : </b> {msg.text}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Msg
