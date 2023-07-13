import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { useEffect, useState } from 'react'
import { CreateChannel } from '../../../types/CreateChannel'


const ChannelBox = () => {
    const [allChan, setAllChan] = useState<Channel[]>([])

    async function createNewChannel(data: CreateChannel) {
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
        getAllChannels()
    }

    async function getAllChannels() {
        const response = await fetch('http://localhost:8080/api/channel')
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const allChannels = await response.json()
        return allChannels
    }

    useEffect(() => {
        const fetchAllChannels = async () => {
            try {
                const allChannels = await getAllChannels()
                setAllChan(allChannels)
            } catch (error) {
                console.error('Error fetching channels:', error)
            }
        }


        fetchAllChannels()
    }, [])
    const handleCreation = (channel: CreateChannel) => {
        console.log('Received values of form: ', channel)
        createNewChannel(channel)
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList
                allChan={allChan}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
