import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserBox from '../components/chat/userBox/UserBox.tsx'
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
    const [users, setUsers] = useState<any[]>([])
	const [blockedUsers, setBlockedUsers] = useState<any[]>([])
	const [admins, setAdmins] = useState<any[]>([])
	const [owner, setOwner] = useState()

    useEffect(() => {
        getAllChannels()
    }, [])

    useEffect(() => {
        if (currentChatSelected) {
			getAllMsg()
			getChUsers()
			getBlockedUsers()
		}
		else {
			setMesssages([])
			setUsers([])
		}
    }, [currentChatSelected])

    const getAllMsg = () => {
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
        socket.emit('changePassword', channelId, password, (response: boolean) => {
            if (!response)
                alert('Could not change password, please try again')
        })
    }

	const getChUsers = () => {
        socket.emit(
            'findUsersByChannel',
            currentChatSelected,	
            (response: any) => {
                setUsers(response.users)
				setAdmins(response.admin)
				setOwner(response.owner)
            }
        )
    }

    const createDM = (targetUserId: number) => {
        socket.emit(
            'createDM',
            userData.user.id,
            targetUserId,
            (response: any) => {
                if (response) {
					setTimeout(() => {
					dispatch(chatActions.selectChat(response.id))
					}, 1000)	
                }
            }
        )
    }

    const blockUser = (targetUserId: number) => {
        socket.emit(
            'blockUser',
            userData.user.id,
            targetUserId,
            (response: any) => {
                if (response) {
                    getBlockedUsers()
                }
            }
        )
    }

	const unblockUser = (targetUserId: number) => {
        socket.emit(
            'unblockUser',
            userData.user.id,
            targetUserId,
            (response: any) => {
                if (response) {
                    getBlockedUsers()
                }
            }
        )
    }

	const getBlockedUsers = () => {
		socket.emit('getBlockedUsers', userData.user.id, (response: any) => {
			console.log(response)
			setBlockedUsers(response)
		})
	}

	const setAdmin = (targetUserId: number) => {
		socket.emit(
			'setAdmin',
			userData.user.id,
			targetUserId,
			currentChatSelected,
			(response: any) => {
				if (response) {
					getChUsers()
				}
			}
		)
	}

	const unsetAdmin = (targetUserId: number) => {
		socket.emit(
			'unsetAdmin',
			userData.user.id,
			targetUserId,
			currentChatSelected,
			(response: any) => {
				if (response) {
					getChUsers()
				}
			}
		)
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
            <UserBox
				users={users}
				blockedUsers={blockedUsers}
				admins={admins}
				owner={owner}
				createDM={createDM}
				blockUser={blockUser}
				unblockUser={unblockUser}
				setAdmin={setAdmin}
				unsetAdmin={unsetAdmin}
				// kickUser={kickUser}
				// BanUser={BanUser}
				// SilenceUser={SilenceUser}
			/>
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
