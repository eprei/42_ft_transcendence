import { Channel } from '../../../types/Channel'
import ChannelType from '../../../types/ChannelType'
import ChannelsDisplay from './ChannelsDisplay'
import styles from './ChannelList.module.css'

interface ChannelListProps {
    allChan: Channel[] | []
    allUserChan: Channel[] | []
}

const ChannelList = (props: ChannelListProps) => {
    const myDms = props.allUserChan.filter(
        (channel) => channel.type === ChannelType.Direct
    )
    const joinedButNotDms = props.allUserChan.filter(
        (channel) => channel.type !== ChannelType.Direct
    )
    const notJoinedChan = props.allChan.filter(
        (chan) => !joinedButNotDms.some((joinchan) => chan.id === joinchan.id)
    )

    return (
        <div className={styles.listsContainer}>
            <div className={styles.list}>
                <h2> Joined Channels </h2>
                <ChannelsDisplay
                    title={'Join a Channel to start chating!'}
                    channels={joinedButNotDms}
                    type="join"
                ></ChannelsDisplay>
            </div>
            <div className={styles.list}>
                <h2> Discover </h2>
                <ChannelsDisplay
                    title={'No channels to discover!'}
                    channels={notJoinedChan}
                    type="discover"
                ></ChannelsDisplay>
            </div>
            <div className={styles.list}>
                <h2> DM </h2>
                <ChannelsDisplay
                    title={'No dm for now'}
                    channels={myDms}
                    type="dm"
                ></ChannelsDisplay>
            </div>
        </div>
    )
}

export default ChannelList
