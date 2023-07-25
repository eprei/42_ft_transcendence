import styles from './Msg.module.css'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

export interface MsgProps {
    id: number
    content: string
    userNickname: string
    userAvatarUrl: string
}

const Msg = ({ msg }: { msg: MsgProps }) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const myNickname = userData.user.nickname

    return (
        <>
            {msg.userNickname === myNickname ? (
                <div className={`${styles.msgContainer} ${styles.me}`}>
                    <div className={styles.textContainer}>
                        <p className={styles.me}>
                            <b>{msg.userNickname} : </b> {msg.content}
                        </p>
                    </div>
                    <img
                        src={msg.userAvatarUrl}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                </div>
            ) : (
                <div className={`${styles.msgContainer} ${styles.they}`}>
                    <img
                        src={msg.userAvatarUrl}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                    <div className={styles.textContainer}>
                        <p className={styles.they}>
                            <b>{msg.userNickname} : </b> {msg.content}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Msg
