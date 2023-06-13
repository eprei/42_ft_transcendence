import styles from './Msg.module.css'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

export interface MsgProps {
    id: number
    content: string 
    creatorUser: {
		nickname: string 
		avatarUrl: string 
	}
}

const Msg = ({ msg }: { msg: MsgProps }) => {

	const { nickname, avatarUrl } = msg.creatorUser;
	const userData = useAppSelector((state) => state.user.userData) as UserData
	const myNickname = userData.user.nickname
	

    return (
        <>
            {nickname === myNickname ? (
                <div className={`${styles.msgContainer} ${styles.me}`}>
                    <div className={styles.textContainer}>
                        <p className={styles.me}>
                            <b>{nickname} : </b> {msg.content}
                        </p>
                    </div>
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                </div>
            ) : (
                <div className={`${styles.msgContainer} ${styles.they}`}>
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className={styles.profilePicture}
                    />
                    <div className={styles.textContainer}>
                        <p className={styles.they}>
                            <b>{nickname} : </b> {msg.content}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Msg
