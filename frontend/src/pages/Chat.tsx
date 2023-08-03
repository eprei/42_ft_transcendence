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
    creator: number
    userNickname: string
    userAvatarUrl: string
}

export interface NewMsg {
    creator: number
    content: string
    channelId: number
}
const socket = io('http://localhost:8080/chat')

const Chat = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const [allChan, setAllChan] = useState<Channel[]>([])
    const [messages, setMesssages] = useState<ReceivedMsg[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [blockedUsers, setBlockedUsers] = useState<number[]>([])
    const [admins, setAdmins] = useState<any[]>([])
    const [owner, setOwner] = useState()
    const [bannedUsers, setBannedUsers] = useState<any[]>([])
    const [mutedUsers, setMutedUsers] = useState<number[]>([])
    const [isDM, setIsDM] = useState<boolean>(false)
    const [reloadUsers, setReloadUsers] = useState(false)

    useEffect(() => {
        getAllChannels()
    }, [])

    useEffect(() => {
        if (currentChatSelected) {
            if (!reloadUsers) {
                getAllMsg()
            }
            getChUsers()
            getBlockedUsers()
            getMutedUsers()
            if (
                allChan.find(
                    (ch) =>
                        ch.id === currentChatSelected && ch.type === 'direct'
                )
            )
                setIsDM(true)
            else setIsDM(false)
        } else {
            setMesssages([])
            setUsers([])
            setAdmins([])
            setBlockedUsers([])
            setBannedUsers([])
            setMutedUsers([])
        }
        setReloadUsers(false)
    }, [currentChatSelected, reloadUsers])

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
        //filtrar mensages por channel id
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
        socket.emit(
            'changePassword',
            channelId,
            password,
            (response: boolean) => {
                if (!response)
                    alert('Could not change password, please try again')
            }
        )
    }

    const getChUsers = () => {
        socket.emit(
            'findUsersByChannel',
            currentChatSelected,
            (response: any) => {
                setUsers(response.users)
                setAdmins(response.admin)
                setOwner(response.owner)
                response.banned
                    ? setBannedUsers(response.banned)
                    : setBannedUsers([])
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
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    const unblockUser = (targetUserId: number) => {
        socket.emit(
            'unblockUser',
            userData.user.id,
            targetUserId,
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    const getBlockedUsers = () => {
        socket.emit('getBlockedUsers', userData.user.id, (response: any) => {
            setBlockedUsers(response)
        })
    }

    const setAdmin = (targetUserId: number) => {
        socket.emit(
            'setAdmin',
            userData.user.id,
            targetUserId,
            currentChatSelected,
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
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
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    const kickUser = (targetUserId: number) => {
        socket.emit(
            'kickUser',
            userData.user.id,
            targetUserId,
            currentChatSelected,
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    const banUser = (targetUserId: number) => {
        socket.emit(
            'banUser',
            userData.user.id,
            targetUserId,
            currentChatSelected,
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    const unbanUser = (targetUserId: number) => {
        socket.emit(
            'unbanUser',
            userData.user.id,
            targetUserId,
            currentChatSelected,
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    // const getBannedUsers = () => {
    // 	socket.emit('getBannedUsers', currentChatSelected, (response: any) => {
    // 		console.log(response)
    // 		setBannedUsers(response)
    // 	})
    // }

    const muteUser = (targetUserId: number) => {
        socket.emit(
            'muteUser',
            userData.user.id,
            targetUserId,
            currentChatSelected,
            (response: { message: string }) => {
                if (response) {
                    setReloadUsers(true)
                }
            }
        )
    }

    const getMutedUsers = () => {
        socket.emit(
            'getMutedUsers',
            currentChatSelected,
            (response: number[]) => {
                setMutedUsers(response)
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
                amImuted={mutedUsers.some(
                    (user: any) => user.id === userData.user.id
                )}
                blockedUsers={blockedUsers}
            />
            <UserBox
                users={users}
                blockedUsers={blockedUsers}
                admins={admins}
                owner={owner}
                bannedUsers={bannedUsers}
                mutedUsers={mutedUsers}
                createDM={createDM}
                blockUser={blockUser}
                unblockUser={unblockUser}
                setAdmin={setAdmin}
                unsetAdmin={unsetAdmin}
                kickUser={kickUser}
                banUser={banUser}
                unbanUser={unbanUser}
                muteUser={muteUser}
                isDM={isDM}
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
