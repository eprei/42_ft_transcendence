import channelType from '../../types/ChannelTypes'
import { Channel } from "../../types/Channel"
import DiscoverChannelsLi from './DiscoverChannelsLi'

interface DiscoverChannelsProps {
    channels: Channel[]
    // leaveChannelHandler: (login: string) => void
}

const DiscoverChannels = (props: DiscoverChannelsProps) => {
    let content: JSX.Element[] | JSX.Element = <p>No channels to discover!</p>
    if (props.channels !== undefined && props.channels.length > 0) {
        content = props.channels.map((channel: Channel) => (
			<DiscoverChannelsLi
                key={channel.id}
                channel={channel}
			></DiscoverChannelsLi>
                // leaveChannelHandler={props.leaveChannelHandler}
				
        ))
    }

    return (  
		 <div>
			 <ul>{content}</ul>
		 </div>
    )
}

export default DiscoverChannels
