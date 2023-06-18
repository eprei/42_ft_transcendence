import styles from './JoinnedChannelsLi.module.css'
import { Channel } from '../../types/Channel'
import IconLeaveChannel from '../../assets/icon/block_user.svg'

interface JoinnedChannelsLiProps {
    channel: Channel
    // leaveChannelHandler: (login: string) => void
}

const JoinnedChannelsLi = (props: JoinnedChannelsLiProps) => {
	// const leaveChannel = () => {
		//     props.leaveChannelHandler(props.channel.login)
		// }
	
		return (
				<li className={`${styles.chList} ${styles.joined}`}>
					{props.channel.name}
					<img
						src={IconLeaveChannel}
						alt="LeaveChannel"
						className={styles.addChannelIcon}
					/>
				</li>
				
			// {/* <li className={styles.li}>
            // <div className={styles.info}>
            //     <div>
            //         <h2>{props.channel.login}</h2>
            //         <p>{props.channel.email}</p>
            //     </div>
            //     <img src={props.channel.avatarUrl} alt="avatar pic" />
            // </div>
            // <button className={styles.btn} onClick={leaveChannel}>
            //     Delete User
            // </button> */}
    )
}

export default JoinnedChannelsLi
