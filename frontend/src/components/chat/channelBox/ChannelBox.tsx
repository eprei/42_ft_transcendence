import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'

interface ChannelListProps {
    discoverChan: Channel[] | []
    joinedChan: Channel[] | []
    myDms: Channel[] | []
}

const ChannelBox = (props: ChannelListProps) => {
    const handleCreation = (channel: Channel) => {
        console.log('Received values of form: ', channel)
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList
                discoverChan={props.discoverChan}
                joinedChan={props.joinedChan}
                myDms={props.myDms}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
