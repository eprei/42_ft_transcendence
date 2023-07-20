import { Channel } from '../../../types/Channel'
import ChannelLi from './ChannelLi'

interface ChannelsDisplayProps {
    channels: Channel[] | []
    title: string
    type: string
}

const DiscoverDisplay = (props: ChannelsDisplayProps) => {
    let content: JSX.Element[] | JSX.Element = <p>{props.title}</p>
    if (props.channels !== undefined && props.channels.length > 0) {
        content = props.channels.map((channel: Channel) => (
            <ChannelLi
                key={channel.id}
                channel={channel}
                type={props.type}
            ></ChannelLi>
        ))
    }

    return (
        <div>
            <ul>{content}</ul>
        </div>
    )
}

export default DiscoverDisplay