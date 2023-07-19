// import IconInviteToPlay from '../../../assets/icon/invite_to_play.svg'
import styles from './User.module.css'
import IconMsg from '../../../assets/icon/message.svg'
import { useState } from 'react'


export interface UserProps {
	id: number
	nickname: string
	avatarUrl: string
	isOwner: boolean
	isAdmin: boolean
}

const User = ({ id, nickname, avatarUrl, isOwner, isAdmin }: UserProps) => {

	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  
	const handleContextMenu = (event: React.MouseEvent<HTMLImageElement>) => {
	  event.preventDefault();
	  setShowContextMenu(true);
	  setContextMenuPosition({ x: event.clientX, y: event.clientY });
	};
  
	const handleContextMenuClose = () => {
	  setShowContextMenu(false);
	};

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className={styles.profilePicture}
					onClick={() => window.location.href = `http://localhost:4040/user/${nickname}`}
					onContextMenu={handleContextMenu}
                />

				{showContextMenu && (
				<div
					className={styles.contextMenu}
					style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
					onClick={handleContextMenuClose}
				>
					<ul>
					<li>Block</li>
					<li>Silent</li>
					{isOwner? <div>
								<li>Set admin</li>
								<li>Remove admin</li>
								<li>Kick</li>
								<li>Ban</li>
							</div>: null}
					{(isAdmin && !isOwner)? <div>
								<li>Kick</li>
								<li>Ban</li>
						</div> 
						: null}
					</ul>
				</div>
      			)}

                <div>
                    <h5>{nickname}</h5>
                </div>
            </div>

            <div className={styles.right}>
                <div>
                    <img src={IconMsg} alt="Message Icon" />
                </div>
				
            </div>
        </div>
    )
}

export default User
