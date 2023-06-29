import { useState, useEffect } from 'react'

import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'

async function getChannels() {
    try {
        const response = await fetch('http://localhost:8080/api/channel')

        if (!response.ok) {
            throw new Error('Failed to fetch channels')
        }

        const channels = await response.json()
        return channels
    } catch (error) {
        console.error(error)
    }
}

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
        postData(channel).then((responseData) => {
            console.log(responseData)
        })
        setTimeout(() => {
            getChannelHandler()
        }, 500)
    }

    useEffect(() => {
        getChannelHandler()
    }, [])

    const getChannelHandler = () => {
        getChannels().then((channels) => {
            setChannels(channels)
            console.log(channels)
        })
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList channels={channels}></ChannelList>
        </div>
    )
}

export default ChannelBox
