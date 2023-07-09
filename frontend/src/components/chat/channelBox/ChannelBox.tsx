import { useState, } from 'react'

import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'


async function postData(data: Channel) {
    try {
        const response = await fetch('http://localhost:8080/api/channel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to make POST request')
        }

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error(error)
    }
}

function ChannelBox() {
    const [channels, setChannels] = useState<Channel[]>([])

    const handleCreation = (channel: Channel) => {
        //     const channelsCpy = [...channels]
        //     channelsCpy.push(channel)
        //     setChannels(channelsCpy)
        // }
        postData(channel).then((responseData) => {
            console.log(responseData)
        })
        // setTimeout(() => {
        //     getChannelHandler()
        // }, 500)
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList channels={channels}></ChannelList>
        </div>
    )
}

export default ChannelBox
