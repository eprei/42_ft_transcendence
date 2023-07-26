import styles from './ChannelBox.module.css'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { CreateChannel } from '../../../types/CreateChannel'
import { Channel } from '../../../types/Channel'

interface ChannelBoxProps {
    allChan: Channel[]
    handleCreation: (channel: CreateChannel) => void
    deleteChannel: (channelId: number) => void
    leaveChannel: (channelId: number) => void
    joinChannel: (channelId: number, password: string) => void
}

const ChannelBox = (props: ChannelBoxProps) => {
    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={props.handleCreation} />
            <ChannelList
                allChan={props.allChan}
                deleteChannel={props.deleteChannel}
                leaveChannel={props.leaveChannel}
                joinChannel={props.joinChannel}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
