import { Channel } from '../../../types/Channel'
import  ChannelTypes  from '../../../types/Channeltypes'

import ChannelsDisplay from './ChannelsDisplay'
import styles from './ChannelList.module.css'

interface ChannelListProps {
    channels: Channel[]
}

const ChannelList = (props: ChannelListProps) => {
    let dms = props.channels.filter((chan) => chan.type === ChannelTypes.Direct)
    let chan = props.channels.filter(
        (chan) => chan.type !== ChannelTypes.Direct
    )

    return (
        <div className={styles.listsContainer}>
            <div className={styles.list}>
                <h2> Joined Channels </h2>
                <ChannelsDisplay
                    title={'Join a Channel to start chating!'}
                    channels={chan}
                ></ChannelsDisplay>
            </div>
            <div className={styles.list}>
                <h2> Discover </h2>
                <ChannelsDisplay
                    title={'No channels to discover!'}
                    channels={chan}
                ></ChannelsDisplay>
            </div>
            <div className={styles.list}>
                <h2> DM </h2>
                <ChannelsDisplay
                    title={'No dm for now'}
                    channels={dms}
                ></ChannelsDisplay>
            </div>
        </div>
    )
}

export default ChannelList
