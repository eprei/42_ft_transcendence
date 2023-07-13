import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import { CreateChannel } from '../../../types/createChannel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

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
    const userData = useAppSelector((state) => state.user.userData) as UserData

    async function getAllChannels() {
        const response = await fetch('http://localhost:8080/api/channel')
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const allChannels = await response.json()
        return allChannels
    }

    async function getAllUserChannels() {
        const response = await fetch(
            `http://localhost:8080/api/channel/user-channels/${userData.user.id}`
        )
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const allUserChannels = await response.json()
        return allUserChannels
    }

    const [allChan, setAllChan] = useState<Channel[]>([])
    const [allUserChan, setAllUserChan] = useState<Channel[]>([])

    useEffect(() => {
        const fetchAllChannels = async () => {
            try {
                const allChannels = await getAllChannels()
                setAllChan(allChannels)
            } catch (error) {
                console.error('Error fetching channels:', error)
            }
        }
        const fetchAllUserChannels = async () => {
            try {
                const allChannels = await getAllUserChannels()
                setAllUserChan(allChannels)
            } catch (error) {
                console.error('Error fetching channels:', error)
            }
        }

        fetchAllChannels()
        fetchAllUserChannels()
    }, [])
    const handleCreation = (channel: CreateChannel) => {
        console.log('Received values of form: ', channel)
        createNewChannel(channel);
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList
                allChan={allChan}
                allUserChan={allUserChan}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
