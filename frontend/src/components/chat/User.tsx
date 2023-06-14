// import React from 'react'
import styles from './User.module.css'
// import ClickableIcon from '../profile/ClickableIcon'
import IconViewProfile from '../../assets/icon/view_profile.svg'
import IconInviteToPlay from '../../assets/icon/invite_to_play.svg'
import IconBlockUser from '../../assets/icon/block_user.svg'
import IconMsg from '../../assets/icon/message.svg'
import React from 'react'

export interface OnlineUserProps {
    id: number
    name: string
    picture: string
	isPlaying: boolean
}

const User: React.FC<{ user: OnlineUserProps }> = ({ user }) => {

	let MsgStyle = ''

    if (user.id !== 1) {
        MsgStyle = styles.they
    } else {
        MsgStyle = styles.me
    }

    let MsgText = ''

    switch (user.name) {
        case 'rburri':
            MsgText = 'parfait!'
            break
        case 'sbars':
            MsgText = 'ça marche'
            break
        case 'epresa-c':
            MsgText = `c'est noté`
            break
        case 'tgrivel':
            MsgText = `d'accord!, ça sera à 15h!`
            break
        default:
            MsgText = `Est-ce qu'on peut faire la reunion a 15:15?`
    }

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
                            { user.isPlaying ? (
								<li className={styles.status}>playing</li>
							) : null }
                        </ul>
                    </span>
                </div>

                <div className={styles.right}>
                    <span className={styles.iconContainer}>
                        <img src={IconViewProfile} alt="Icon" />
						{ user.isPlaying ? (
                        <img src={IconInviteToPlay} alt="Icon" />
						) : null }
                        <img src={IconBlockUser} alt="Icon" />
                        <img src={IconMsg} alt="Icon" />
                    </span>
                </div>
            </div>
        </>
    )
}

export default User

