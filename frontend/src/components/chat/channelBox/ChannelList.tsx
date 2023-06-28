import { Channel } from "../../../types/Channel"
import ChannelsDisplay from './ChannelsDisplay'
import styles from './ChannelList.module.css'

interface ChannelListProps {
	channels: Channel[]
}

const ChannelList = (props: ChannelListProps) => {

	return (
		<div className={styles.listsContainer}>
			<div className={styles.list}>
				<h2> Joined Channels </h2>
				<ChannelsDisplay
					title={'Join a Channel to start chating!'}
					channels={props.channels}
				></ChannelsDisplay>
			</div>

			<div className={styles.list}>
				<h2> Discover </h2>
				<ChannelsDisplay
					title={'No channels to discover!'}
					channels={props.channels}
				></ChannelsDisplay>
			</div>
		</div>
	)
}

export default ChannelList



