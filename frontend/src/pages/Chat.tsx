import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserList from '../components/chat/userBox/UserBox.tsx'
import { userActions } from '../store/user'
import store from '../store'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { CreateChannel } from '../types/CreateChannel'
import { useAppDispatch, useAppSelector } from '../store/types'
import { chatActions } from '../store/chat'
import { UserData } from '../types/UserData'
import { Channel } from '../types/Channel'

export interface ReceivedMsg {
    id: number
    content: string
    userNickname: string
    userAvatarUrl: string
}

export interface NewMsg {
    creator: number
    content: string
    channelId: number
}
const socket = io('http://localhost:8080')

const Chat = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const [allChan, setAllChan] = useState<Channel[]>([])
    const [messages, setMesssages] = useState<ReceivedMsg[]>([])

    useEffect(() => {
        getAllChannels()
    }, [])

    useEffect(() => {
        if (currentChatSelected) getAllMsgSocket()
        else setMesssages([])
    }, [currentChatSelected])

    const getAllMsgSocket = () => {
        socket.emit(
            'findAllMsgByChannel',
            currentChatSelected,
            (response: ReceivedMsg[]) => {
                setMesssages(response)
            }
        )
    }

    socket.on('incomingMessage', (newMessage: any) => {
        const msgCpy = [...messages]
        msgCpy.push(newMessage)
        setMesssages(msgCpy)
    })

    const sendMessage = (newMsg: NewMsg) => {
        socket.emit('postMsg', newMsg, () => {})
    }

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

    const leaveChannel = (channelId: number) => {
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
    const changePassword = (channelId: number, password: string) => {
        console.log('channelId: ', channelId)
        socket.emit('changePassword', channelId, password, () => {})
    }

    return (
        <div className={styles.chatContainer}>
            <ChannelBox
                allChan={allChan}
                handleCreation={handleCreation}
                deleteChannel={deleteChannel}
                leaveChannel={leaveChannel}
                joinChannel={joinChannel}
                changePassword={changePassword}
            />
            <ChatBox
                currentChatSelected={currentChatSelected}
                messages={messages}
                sendMessage={sendMessage}
            />
            <UserList />
        </div>
    )
}

export default Chat

export async function loader() {
    const response = await fetch(`http://localhost:8080/api/user/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching user data' })
        )
    }

    const data = await response.json()
    store.dispatch(userActions.update({ user: data }))
    return data
}
