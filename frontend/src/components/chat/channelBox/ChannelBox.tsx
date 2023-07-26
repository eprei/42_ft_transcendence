import styles from './ChannelBox.module.css'
import { Channel } from '../../../types/Channel'
import CreateNewCh from './CreateNewCh'
import ChannelList from './ChannelList'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { CreateChannel } from '../../../types/CreateChannel'
import { useAppDispatch, useAppSelector } from '../../../store/types'
import { chatActions } from '../../../store/chat'
import { UserData } from '../../../types/UserData'

const ChannelBox = () => {
    const socket = io('http://localhost:8080')
    const [allChan, setAllChan] = useState<Channel[]>([])
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const dispatch = useAppDispatch()

    useEffect(() => {
        getAllChannels()
    }, [])

    const createNewChannel = (channel: CreateChannel) => {
        socket.emit('createNewChannel', channel, () => {})
    }

    socket.on('newChannel', () => {
        getAllChannels()
    })

    const getAllChannels = () => {
        socket.emit('getAllChannels', (response: any) => {
            const allChannels = response
            setAllChan(allChannels)
        })
    }

    const handleCreation = (channel: CreateChannel) => {
        createNewChannel(channel)
    }

    const LeaveChannel = (channelId: number) => {
        socket.emit('leaveChannel', channelId, userData.user.id, () => {
            dispatch(chatActions.selectChat(0))
            getAllChannels()
        })
    }
    const deleteChannel = (channelId: number) => {
        socket.emit('deleteChannel', channelId, userData.user.id, () => {
            dispatch(chatActions.selectChat(0))
            getAllChannels()
        })
    }

    const joinChannel = (channelId: number, password: string) => {
        socket.emit(
            'joinChannel',
            channelId,
            userData.user.id,
            password,
            () => {
                getAllChannels()
                dispatch(chatActions.selectChat(channelId))
            }
        )
    }

    return (
        <div className={styles.channelbox}>
            <CreateNewCh handleCreation={handleCreation} />
            <ChannelList
                allChan={allChan}
                deleteChannel={deleteChannel}
                leaveChannel={LeaveChannel}
                joinChannel={joinChannel}
            ></ChannelList>
        </div>
    )
}

export default ChannelBox
