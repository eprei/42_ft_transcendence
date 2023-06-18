// import styles from './ChannelsList.module.css'
// import styles from './JoinnedChannels.module.css'
import { Channel } from "../../types/Channel"
import JoinnedChannelsLi from './JoinnedChannelsLi'

interface JoinnedChannelsProps {
    channels: Channel[]
    // leaveChannelHandler: (login: string) => void
}

const JoinnedChannels = (props: JoinnedChannelsProps) => {
    let content: JSX.Element[] | JSX.Element = <p>Join a Channel to start chating!</p>
    if (props.channels !== undefined && props.channels.length > 0) {
        content = props.channels.map((channel: Channel) => (
			<JoinnedChannelsLi
                key={channel.id}
                channel={channel}
			></JoinnedChannelsLi>
                // leaveChannelHandler={props.leaveChannelHandler}
				
        ))
    }

    return (
		 <div>
            <ul>{content}</ul>
        </div>
    )
}

export default JoinnedChannels



