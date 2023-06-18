import { Channel } from "../../types/Channel"
import JoinnedChannels from './JoinnedChannels'
import DiscoverChannels from './DiscoverChannels'

interface ChannelListProps {
	channels: Channel[]
}

const ChannelList = ( props: ChannelListProps)  => {
// 		let content: JSX.Element[] | JSX.Element = <p>CACA</p>
// 		if (props !== undefined) {
// 		    content = props.channels.map((channel: Channel) => (
// 				<li>{channel.name}</li>
// 			))
// 			}
	
		// let content: JSX.Element[] | JSX.Element = <p>Join a Channel to start chating!</p>
		// if (props.channels !== undefined && props.channels.length > 0) {
		// 	content = props.channels.map((channel: Channel) => (
		// 		<JoinnedChannelsLi
		// 			key={channel.id}
		// 			channel={channel}
		// 		></JoinnedChannelsLi>
		// 	))
		// }

	return (
        // <div className={`${styles.chList}`}>
		<div>
            <h2> Joinned Channels </h2>
			{/* {content} */}
			<JoinnedChannels
				channels={props.channels}
			></JoinnedChannels>
			<h2> Discover </h2>
			<DiscoverChannels
				channels={props.channels}
			>
			</DiscoverChannels>
		</div>
		)
	}
		
export default ChannelList



