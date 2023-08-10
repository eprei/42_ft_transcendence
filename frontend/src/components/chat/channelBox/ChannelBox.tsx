import styles from './ChannelBox.module.css'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { Channel } from '../../../types/Channel'
import { Socket } from 'socket.io-client'

interface ChannelBoxProps {
    allChan: Channel[]
    socket: Socket | undefined
    deleteChannel: (channelId: number) => void
    leaveChannel: (channelId: number) => void
    joinChannel: (channelId: number, password: string) => void
    changePassword: (channelId: number, password: string) => void
}

const ChannelBox = (props: ChannelBoxProps) => {
    return (
        <div className={styles.channelbox}>
            <CreateNewCh socket={props.socket} />
            <ChannelList
                allChan={props.allChan}
                deleteChannel={props.deleteChannel}
                leaveChannel={props.leaveChannel}
                joinChannel={props.joinChannel}
                changePassword={props.changePassword}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
