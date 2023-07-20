import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

const ChannelBox = () => {
    const socket = io('http://localhost:8080')
    const [allChan, setAllChan] = useState<Channel[]>([])

    useEffect(() => {
        getAllChannels()
    }, [])

    const createNewChannel = (channel: CreateChannel) => {
        socket.emit('createNewChannel', channel, (response: any) => {
            console.log(response)
            alert('Channel created')
        })
    }

    socket.on('newChannel', (newChannel: Channel) => {
        setAllChan((previousState) => {
            return [...previousState, newChannel]
        })
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
            <ChannelList
                allChan={allChan}
                getAllChannels={getAllChannels}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
