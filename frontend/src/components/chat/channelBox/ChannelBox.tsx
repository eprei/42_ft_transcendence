import { useLoaderData } from 'react-router-dom'
import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'

function ChannelBox() {
    const channels: Channel[] = useLoaderData() as Channel[]

    const handleCreation = (channel: Channel) => {
        console.log('Received values of form: ', channel)
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList channels={channels}></ChannelList>
        </div>
    )
}

export default ChannelBox
