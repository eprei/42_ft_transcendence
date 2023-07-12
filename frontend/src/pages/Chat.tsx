// import { useState } from 'react'
// import { Channel } from '../types/Channel'
// import { useLoaderData } from 'react-router-dom'
import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserList from '../components/chat/userBox/UserBox.tsx'

const Chat = () => {
    // const allchannels: Channel[] = useLoaderData() as Channel[]

    // const [allChannels, setAllChannels] = useState<Channel[]>([])
    // const [myDms, setMyDms] = useState<Channel[]>([])
    // const [joinedChannel, setJoinedChannel] = useState<Channel[]>([])
    return (
        <>
            <div className={styles.chatContainer}>
                <ChannelBox
                // discoverChan={allChannels}
                // myDms={myDms}
                // joinedChan={joinedChannel}
                />
                <ChatBox />
                <UserList />
            </div>
        </>
    )
}

export default Chat

// export const loader = async () => {
//     const response = await fetch('http://localhost:8080/api/channel')
//     if (!response.ok) {
//         throw new Error(response.statusText)
//     }
//     const channelsData = await response.json()
//     console.log('channelsData: ', channelsData)
//     return channelsData
// }
