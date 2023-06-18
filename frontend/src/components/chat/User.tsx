import styles from './User.module.css'
import IconInviteToPlay from '../../assets/icon/invite_to_play.svg'
import IconMsg from '../../assets/icon/message.svg'

export interface OnlineUserProps {
    id: number
    name: string
    picture: string
    isOnline: boolean
    isPlaying: boolean
}

const User = ({ user }: { user: OnlineUserProps }) => {
    let inviteToPlay: JSX.Element | null = null
    if (user.isOnline && !user.isPlaying) {
        inviteToPlay = <img src={IconInviteToPlay} alt="Invite to Play Icon" />
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img
                    src={user.picture}
                    alt="Avatar"
                    className={styles.profilePicture}
                />
                <div>
                    <h5>{user.name}</h5>
                    <p className={styles.status}>
                        {user.isPlaying ? 'playing' : ''}{' '}
                    </p>
                </div>
            </div>

            <div className={styles.right}>
                <div>{inviteToPlay}</div>
                <div>
                    <img src={IconMsg} alt="Message Icon" />
                </div>
            </div>
        </div>
    )
}

export default User
