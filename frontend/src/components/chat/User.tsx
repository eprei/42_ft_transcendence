// import React from 'react'
import styles from './User.module.css'
// import ClickableIcon from '../profile/ClickableIcon'
import IconViewProfile from '../../assets/icon/view_profile.svg'
import IconInviteToPlay from '../../assets/icon/invite_to_play.svg'
import IconBlockUser from '../../assets/icon/block_user.svg'
import IconMsg from '../../assets/icon/message.svg'
import PicturePlaceHolder from '../../assets/img/profil-picture-placeholder.png'
// import IconGenericPicture from '../../assets/icon/generic_picture.svg'

function User() {
	return (
	  <>
		<div className={styles.container}>

<div className={styles.left}>

			<span>
				<img src={PicturePlaceHolder} alt="Avatar" 
				className={styles.profilePicture} />
            </span>
			<span className={styles.uList}>
				<ul>
					<li className={styles.name}>rburri </li>
					<li className={styles.status}>playing</li>
				</ul>
			</span>
	</div>					
		
<div className={styles.right}>
			<span className={styles.iconContainer}>
				<img src={IconViewProfile} alt="Icon" />
				<img src={IconInviteToPlay} alt="Icon" />
				<img src={IconBlockUser} alt="Icon" />
				<img src={IconMsg} alt="Icon" />
			</span>
		</div>
		</div>
	</>
	)
}

export default User

		{/* <div className={styles.container}> */}
			
			{/*<span
                // className={styles.profilePicture}
                // style={profilePictureStyle}
            ></span>
            <span className={styles.nameAndStatus}>
                <span className={styles.name}>{name}</span>
                {isFriend ? (
                    <span className={`${styles.status} ${statusColorClass}`}>
                        {status}
                    </span>
                ) : null}
            </span> */}
		  
                    // <ClickableIcon icon={IconViewProfile} onClick={viewProfile}/>
					// {isPlaying ? (
					// 	<ClickableIcon icon={IconInviteToPlay} onClick={inviteToPlay} />
						// <span className={`${styles.status} ${statusColorClass}`}>
							// {status}
						// </span>
					// ) : null}
					// // isBlocked ? (
                    // <ClickableIcon icon={IconBlockUser} onClick={blockUser} />
                    // <ClickableIcon icon={IconMsg} onClick={msg} />
                // )
			// 	}
            // </span>
// 		</>
// 	)
// }
	  
					{/* <User className={`${styles.uList} ${styles.silent}`}>
						rburri
						mpons
						epresa-c
						tgrivel
						sbars
					</User> */}

