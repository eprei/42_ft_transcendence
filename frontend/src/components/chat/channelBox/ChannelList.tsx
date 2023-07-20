import { Channel } from '../../../types/Channel'
import ChannelType from '../../../types/ChannelType'
import DmDisplay from './DmDisplay'
import DiscoverDisplay from './DiscoverDisplay'
import JoinedDisplay from './JoinedDisplay'
import styles from './ChannelList.module.css'
import { useAppSelector } from '../../../store/types'
import { User, UserData } from '../../../types/UserData'
import { useAtom } from 'jotai'
import { chatIdAtom } from './ChannelLi'

interface ChannelListProps {
    allChan: Channel[] | []
}

const ChannelList = (props: ChannelListProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    let allUserChan: Channel[] | [] = []
    let myDms: Channel[] | [] = []
    let joinedButNotDms: Channel[] | [] = []
    let notJoinedChan: Channel[] | [] = []
    let notJoinedAndNotDms: Channel[] | [] = []

    console.log(props.allChan)

    if (props.allChan.length !== 0) {
        allUserChan = props.allChan.filter((chan: Channel) =>
            chan.users.some((user: User) => user.id === userData.user.id)
        )

        notJoinedChan = props.allChan.filter((chan) =>
            chan.users.every((user: User) => user.id !== userData.user.id)
        )
        console.log(notJoinedChan)

		const myNickname = userData.user.nickname

		const changeName = (channel: Channel) => {
			const name = channel.name
			const nameArray = name.split(' & ')
			console.log(nameArray)
			const index = nameArray.indexOf(myNickname)
			if (index === 0) 
				channel.name = nameArray[1]
			else
				channel.name = nameArray[0]
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

    const [chatId, setChatId] = useAtom(chatIdAtom)
    const resetChatId = () => {
        if (chatId != 0) setChatId(0)
    }

    return (
        <div className={styles.listsContainer}>
            <div className={styles.list}>
                <h2 onClick={resetChatId}> Joined Channels </h2>
                <JoinedDisplay
                    title={'Join a Channel to start chating!'}
                    channels={joinedButNotDms}
                    type="join"
                ></JoinedDisplay>
            </div>
            <div className={styles.list}>
                <h2> Discover </h2>
                <DiscoverDisplay
                    title={'No channels to discover!'}
                    channels={notJoinedAndNotDms}
                    type="discover"
                ></DiscoverDisplay>
            </div>
            <div className={styles.list}>
                <h2> DM </h2>
                <DmDisplay
                    title={'No dm for now'}
                    channels={myDms}
                    type="dm"
                ></DmDisplay>
            </div>
        </div>
    )
}

export default ChannelList
