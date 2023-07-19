import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAtom } from 'jotai'
import { joinedChannelAtom } from './ChannelLi'

const socket = io('http://localhost:8080')

const ChannelBox = () => {
	
	const socket = io('http://localhost:8080')
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
