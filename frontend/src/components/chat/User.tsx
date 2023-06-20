// import ClickableIcon from '../profile/ClickableIcon'
// import IconViewProfile from '../../assets/icon/view_profile.svg'
// import IconBlockUser from '../../assets/icon/block_user.svg'
import styles from './User.module.css'
import IconInviteToPlay from '../../assets/icon/invite_to_play.svg'
import IconMsg from '../../assets/icon/message.svg'
import IconAddFriend from '../../assets/icon/add_friend.svg'

export interface OnlineUserProps {
    id: number
    name: string
    picture: string
	isOnline: boolean
    isPlaying: boolean
}

const User = ({ user }: { user: OnlineUserProps }) => {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <span>
                        <img
                            src={user.picture}
                            alt="Avatar"
                            className={styles.profilePicture}
                        />
                    </span>
                    <span className={styles.uList}>
                        <ul>
                            <li className={styles.name}>{user.name} </li>
                            {user.isPlaying ? (
                                <li className={styles.status}>playing</li>
                            ) : null}
                        </ul>
                    </span>
                </div>

                <div className={styles.right}>
                    <span className={styles.iconContainer}>
					<img
                                src={IconAddFriend}
                                alt="plus sign"
                                className={styles.addChannelIcon}
								/>
                        {/* <img src={IconViewProfile} alt="Icon" /> */}
                        {!user.isPlaying ? (
                            <img src={IconInviteToPlay} alt="Icon" />
                        ) : null}
						{/* <img src={IconBlockUser} alt="Icon" /> */}
                        <img src={IconMsg} alt="Icon" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default User
