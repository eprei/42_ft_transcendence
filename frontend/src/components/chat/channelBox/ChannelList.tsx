import { Channel } from '../../../types/Channel'
import ChannelType from '../../../types/ChannelType'
import ChannelsDisplay from './ChannelsDisplay'
import styles from './ChannelList.module.css'
import { useAppSelector } from '../../../store/types'
import { User, UserData } from '../../../types/UserData'

interface ChannelListProps {
    allChan: Channel[] | []
    // allUserChan: Channel[] | []
}

const ChannelList = (props: ChannelListProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData

   console.log(props.allChan);
    const allUserChan = props.allChan.filter((chan: Channel) =>
  chan.users.some((user: User) => user.id === userData.user.id)
);

    const myDms = allUserChan.filter(
        (channel) => channel.type === ChannelType.Direct
    )
    const joinedButNotDms = allUserChan.filter(
        (channel) => channel.type !== ChannelType.Direct
    )
    const notJoinedChan = props.allChan.filter(
        (chan) => !joinedButNotDms.some((joinchan) => chan.id === joinchan.id)
    )
    const notJoinedAndNotDms = notJoinedChan.filter(
        (channel) => channel.type !== ChannelType.Direct
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
                    channels={notJoinedAndNotDms}
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
