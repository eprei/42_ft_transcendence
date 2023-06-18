import styles from './JoinnedChannels.module.css'
import { Channel } from '../../types/Channel'
import IconJoinChannel from '../../assets/icon/add_friend.svg'
import ChannelTypes from '../../types/ChannelTypes'
import IconPrivate from '../../assets/icon/lock.svg'

interface DiscoverChannelsLiProps {
    channel: Channel
    // joinChannelHandler: (login: string) => void
}

const DiscoverChannelsLi = (props: DiscoverChannelsLiProps) => {
	// const joinChannel = () => {
	//     props.joinChannelHandler(props.channel.login)
	// }
	let icons = (
		props.channel.type === ChannelTypes.Public ? (
			<li
				className={`${styles.chList} ${styles.incomingMsg}`}
			>
				{props.channel.name}
				<img
					src={IconJoinChannel}
					alt="JoinChannel"
					className={styles.addChannelIcon}
				/>
			</li>
		) : (
			<li
				className={`${styles.chList} ${styles.incomingMsg}`}
			>
				{props.channel.name}
				<img
					src={IconPrivate}
					alt="Private Channel"
					className={styles.privateIcon}
				/>
				<img
					src={IconJoinChannel}
					alt="JoinChannel"
					className={styles.addChannelIcon}
				/>
			</li>
		)
	)
	

		return (
			<>
			{/* </>li className={`${styles.chList} ${styles.joined}`}> */}
				{icons}
			{/* </li> */}
			</>
		)
}

export default DiscoverChannelsLi
