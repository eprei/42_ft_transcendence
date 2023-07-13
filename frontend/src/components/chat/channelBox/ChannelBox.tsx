import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import { CreateChannel } from '../../../types/createChannel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { useEffect, useState } from 'react'
import { CreateChannel } from '../../../types/CreateChannel'
import { io } from 'socket.io-client'
import { useAtom } from 'jotai'
import { joinedChannelAtom } from './ChannelLi'

const socket = io('http://localhost:8080')

async function createNewChannel(data: CreateChannel) {
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
const ChannelBox = () => {
    const [allChan, setAllChan] = useState<Channel[]>([])
    const [joinedChannel] = useAtom(joinedChannelAtom)

    useEffect(() => {
        getAllChannels()
    }, [joinedChannel])

    const createNewChannel = (channel: CreateChannel) => {
        socket.emit('createNewChannel', channel, (response: any) => {
            console.log(response)
            alert('Channel created')
        })
    }

    socket.on('newChannel', (newChannel: Channel) => {
        const chanCpy = [...allChan]
        chanCpy.push(newChannel)
        setAllChan(chanCpy)
    })

    const getAllChannels = () => {
        socket.emit('getAllChannels', (response: any) => {
            console.log(response)
            const allChannels = response
            setAllChan(allChannels)
        })
    }

    const handleCreation = (channel: CreateChannel) => {
        createNewChannel(channel)
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList allChan={allChan}></ChannelList>
        </div>
    )
}

export default ChannelBox
