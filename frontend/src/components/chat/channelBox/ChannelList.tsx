import { Channel } from '../../../types/Channel'
import ChannelType from '../../../types/ChannelType'
import DmDisplay from './dmChannels/DmDisplay'
import DiscoverDisplay from './discoverChannels/DiscoverDisplay'
import JoinedDisplay from './joinedChannels/JoinedDisplay'
import styles from './ChannelList.module.css'
import { useAppSelector } from '../../../store/types'
import { User, UserData } from '../../../types/UserData'

interface ChannelListProps {
    allChan: Channel[] | []
    deleteChannel: (channelId: number) => void
    leaveChannel: (channelId: number) => void
    joinChannel: (channelId: number, password: string) => void
    changePassword: (channelId: number, password: string) => void
}

const ChannelList = (props: ChannelListProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    let allUserChan: Channel[] | [] = []
    let myDms: Channel[] | [] = []
    let joinedButNotDms: Channel[] | [] = []
    let notJoinedChan: Channel[] | [] = []
    let notJoinedAndNotDms: Channel[] | [] = []

    if (props.allChan.length !== 0) {
        allUserChan = props.allChan.filter((chan: Channel) =>
            chan.users.some((user: User) => user.id === userData.user.id)
        )

        notJoinedChan = props.allChan.filter((chan) =>
            chan.users.every((user: User) => user.id !== userData.user.id)
        )

        const myNickname = userData.user.nickname

        const changeName = (channel: Channel) => {
            const name = channel.name
            const nameArray = name.split(' & ')
            const index = nameArray.indexOf(myNickname)
            if (index === 0) channel.name = nameArray[1]
            else channel.name = nameArray[0]
        }

        myDms = allUserChan
            .filter((channel) => channel.type === ChannelType.Direct)
            .map((channel) => {
                changeName(channel)
                return channel
            })

        joinedButNotDms = allUserChan.filter(
            (channel) => channel.type !== ChannelType.Direct
        )

        notJoinedAndNotDms = notJoinedChan.filter(
            (channel) => channel.type !== ChannelType.Direct
        )
    }

    return (
        <div className={styles.listsContainer}>
            <div className={styles.list}>
                <h2> Joined Channels </h2>
                <JoinedDisplay
                    channels={joinedButNotDms}
                    deleteChannel={props.deleteChannel}
                    leaveChannel={props.leaveChannel}
                    changePassword={props.changePassword}
                ></JoinedDisplay>
            </div>
            <div className={styles.list}>
                <h2> Discover </h2>
                <DiscoverDisplay
                    channels={notJoinedAndNotDms}
                    joinChannel={props.joinChannel}
                ></DiscoverDisplay>
            </div>
            <div className={styles.list}>
                <h2> DM </h2>
                <DmDisplay
                    channels={myDms}
                    deleteChannel={props.deleteChannel}
                    leaveChannel={props.leaveChannel}
                ></DmDisplay>
            </div>
        </div>
    )
}

export default ChannelList
