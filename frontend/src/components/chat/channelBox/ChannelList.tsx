import { Channel } from '../../../types/Channel'
import ChannelsDisplay from './ChannelsDisplay'
import styles from './ChannelList.module.css'

interface ChannelListProps {
    discoverChan: Channel[] | []
    joinedChan: Channel[] | []
    myDms: Channel[] | []
}

const ChannelList = (props: ChannelListProps) => {
    return (
        <div className={styles.listsContainer}>
            <div className={styles.list}>
                <h2> Joined Channels </h2>
                <ChannelsDisplay
                    title={'Join a Channel to start chating!'}
                    channels={props.joinedChan}
                ></ChannelsDisplay>
            </div>
            <div className={styles.list}>
                <h2> Discover </h2>
                <ChannelsDisplay
                    title={'No channels to discover!'}
                    channels={props.joinedChan}
                ></ChannelsDisplay>
            </div>
            <div className={styles.list}>
                <h2> DM </h2>
                <ChannelsDisplay
                    title={'No dm for now'}
                    channels={props.joinedChan}
                ></ChannelsDisplay>
            </div>
        </div>
    )
}

export default ChannelList
