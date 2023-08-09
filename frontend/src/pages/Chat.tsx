import styles from './Chat.module.css'
import ChannelBox from '../components/chat/channelBox/ChannelBox.tsx'
import ChatBox from '../components/chat/chatBox/ChatBox'
import UserBox from '../components/chat/userBox/UserBox.tsx'
import { useEffect, useState } from 'react'
import { CreateChannel } from '../types/CreateChannel'
import { useAppDispatch, useAppSelector } from '../store/types'
import { chatActions } from '../store/chat'
import { UserData } from '../types/UserData'
import { Channel } from '../types/Channel'
import SocketChatService from '../sockets/SocketChat.ts'
import { Socket } from 'socket.io-client'
import InvitationHandler from '../sockets/InvitationHandler'

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

const Chat = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const currentChatSelectedType = useAppSelector(
        (state) => state.chat.type
    ) as string
    const [allChan, setAllChan] = useState<Channel[]>([])
    const [messages, setMesssages] = useState<ReceivedMsg[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [blockedUsers, setBlockedUsers] = useState<number[]>([])
    const [admins, setAdmins] = useState<any[]>([])
    const [owner, setOwner] = useState()
    const [bannedUsers, setBannedUsers] = useState<any[]>([])
    const [mutedUsers, setMutedUsers] = useState<number[]>([])
    const [isDM, setIsDM] = useState<boolean>(false)
    
    const [reload, setReload] = useState(false)
    const [reloadChannels, setReloadChannels] = useState(false)
    const [reloadUsers, setReloadUsers] = useState(false)
    const [reloadFeed, setReloadFeed] = useState(false)
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const newSocket = SocketChatService.getInstance().connect()
        if (newSocket !== undefined) {
            setSocket(newSocket)

            newSocket.on('reload', () => {
                setTimeout(() => {
                    setReload(true)
                }, 300)
            })

            newSocket.on('reloadChannels', () => {
                setReloadChannels(true)
            })

            newSocket.on('reloadUsers', () => {
                setReloadUsers(true)
            })

            newSocket.on('reloadFeed', () => {
                setReloadFeed(true)
            })

            return () => {
                newSocket.off('reload')
                newSocket.off('reloadChannels')
                newSocket.off('reloadUsers')
                newSocket.off('reloadFeed')
            }
        } else {
            console.log('Socket not connected')
        }
    }, [])

    useEffect(() => {
        if (socket !== undefined) {
            getAllChannels()
            console.log('Socket effect')
        }
    }, [socket])

    useEffect(() => {
        getAllChannels()
        if (currentChatSelected) {
            console.log('Chat selected effect')
            getAllMsg()
            getChUsers()
            getBlockedUsers()
            getMutedUsers()
            allChan.find(
                (ch) => ch.id === currentChatSelected && ch.type === 'direct'
            )
                ? setIsDM(true)
                : setIsDM(false)
        } else {
            setMesssages([])
            setUsers([])
            setAdmins([])
            setBlockedUsers([])
            setBannedUsers([])
            setMutedUsers([])
        }
    }, [currentChatSelected])

    useEffect(() => {
        if (reload) {
            console.log('Reload effect')
            getAllChannels()
            getAllMsg()
            getChUsers()
            getBlockedUsers()
            getMutedUsers()
            allChan.find(
                (ch) => ch.id === currentChatSelected && ch.type === 'direct'
            )
                ? setIsDM(true)
                : setIsDM(false)
        }
        setReload(false)
    }, [reload])

    useEffect(() => {
        if (reloadChannels) {
            console.log('Reload channels effect')
            getAllChannels()
        }
        setReloadChannels(false)
    }, [reloadChannels])

    useEffect(() => {
        if (currentChatSelected && reloadFeed) {
            console.log('Reload feed effect')
            getAllMsg()
        }
        setReloadFeed(false)
    }, [reloadFeed])

    useEffect(() => {
        if (currentChatSelected && reloadUsers) {
            console.log('Reload users effect')
            getChUsers()
            getBlockedUsers()
            getMutedUsers()
            allChan.find(
                (ch) => ch.id === currentChatSelected && ch.type === 'direct'
            )
                ? setIsDM(true)
                : setIsDM(false)
        }
        setReloadUsers(false)
    }, [reloadUsers])

    // MESSAGE HANDLING

    const getAllMsg = () => {
        if (socket !== undefined) {
            socket.emit(
                'findAllMsgByChannel',
                currentChatSelected,
                (response: ReceivedMsg[]) => {
                    setMesssages(response)
                }
            )
        }
    }

    const sendMessage = (newMsg: NewMsg) => {
        if (socket !== undefined) socket.emit('postMsg', newMsg, () => {})
    }

    // CHANNEL HANDLING

    const createNewChannel = (channel: CreateChannel) => {
        if (socket !== undefined) {
            socket.emit('createNewChannel', channel, (channelId: number) => {
                dispatch(
                    chatActions.updateChat({
                        currentChatSelected: channelId,
                        type: channel.type,
                    })
                )
            })
        }
    }

    const getAllChannels = () => {
        if (socket !== undefined) {
            socket.emit('getAllChannels', (response: any) => {
                const allChannels = response
                if (
                    !allChannels.some(
                        (ch: Channel) => ch.id === currentChatSelected
                    )
                ) {
                    dispatch(
                        chatActions.updateChat({
                            currentChatSelected: 0,
                            type: '',
                        })
                    )
                }
                setAllChan(allChannels)
            })
        }
    }

    const handleCreation = (channel: CreateChannel) => {
        if (socket !== undefined) createNewChannel(channel)
    }

    const createDM = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'createDM',
                userData.user.id,
                targetUserId,
                (response: any) => {
                    if (response) {
                        setTimeout(() => {
                            getAllChannels()
                            dispatch(
                                chatActions.updateChat({
                                    currentChatSelected: response.id,
                                    type: 'direct',
                                })
                            )
                        }, 600)
                    }
                }
            )
        }
    }

    const leaveChannel = (channelId: number) => {
        if (socket !== undefined) {
            socket.emit('leaveChannel', channelId, userData.user.id, () => {
                dispatch(
                    chatActions.updateChat({ currentChatSelected: 0, type: '' })
                )
            })
        }
    }
    const deleteChannel = (channelId: number) => {
        if (socket !== undefined) {
            socket.emit('deleteChannel', channelId, userData.user.id, () => {
                dispatch(
                    chatActions.updateChat({ currentChatSelected: 0, type: '' })
                )
            })
        }
    }

    const joinChannel = (channelId: number, password: string) => {
        if (socket !== undefined) {
            socket.emit(
                'joinChannel',
                channelId,
                userData.user.id,
                password,
                () => {
                    getAllChannels()
                    dispatch(
                        chatActions.updateChat({
                            currentChatSelected: channelId,
                            type: '',
                        })
                    )
                }
            )
        }
    }
    const changePassword = (channelId: number, password: string) => {
        if (socket !== undefined) {
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
    }

    // USER HANDLING

    const getChUsers = () => {
        if (socket !== undefined) {
            socket.emit(
                'findUsersByChannel',
                currentChatSelected,
                (response: any) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(response, null, 2))
                        setUsers(response.users)
                        setAdmins(response.admin)
                        setOwner(response.owner)
                        response.banned
                            ? setBannedUsers(response.banned)
                            : setBannedUsers([])
                    }, 600)
                }
            )
        }
    }

    const getBlockedUsers = () => {
        if (socket !== undefined) {
            socket.emit(
                'getBlockedUsers',
                userData.user.id,
                (response: any) => {
                    // setTimeout(() => {
                        console.log('blocked users= ', response)
                        setBlockedUsers(response)
                    // }, 600)
                }
            )
        }
    }

    const getMutedUsers = () => {
        if (socket !== undefined) {
            socket.emit(
                'getMutedUsers',
                currentChatSelected,
                (response: number[]) => {
                    setTimeout(() => {
                        setMutedUsers(response)
                    }, 600)
                }
            )
        }
    }

    const blockUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit('blockUser', userData.user.id, targetUserId, () => {
                if (currentChatSelectedType === 'direct') {
                    dispatch(
                        chatActions.updateChat({
                            currentChatSelected: 0,
                            type: '',
                        })
                    )
                }
            })
        }
    }

    const unblockUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit('unblockUser', userData.user.id, targetUserId, () => {})
        }
    }

    const setAdmin = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'setAdmin',
                userData.user.id,
                targetUserId,
                currentChatSelected,
                () => {}
            )
        }
    }

    const unsetAdmin = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'unsetAdmin',
                userData.user.id,
                targetUserId,
                currentChatSelected,
                () => {}
            )
        }
    }

    const kickUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'kickUser',
                userData.user.id,
                targetUserId,
                currentChatSelected,
                () => {}
            )
        }
    }

    const banUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'banUser',
                userData.user.id,
                targetUserId,
                currentChatSelected,
                () => {}
            )
        }
    }

    const unbanUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'unbanUser',
                userData.user.id,
                targetUserId,
                currentChatSelected,
                () => {}
            )
        }
    }

    const muteUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'muteUser',
                userData.user.id,
                targetUserId,
                currentChatSelected,
                () => {}
            )
        }
    }

    return (
        <div>
            <InvitationHandler />
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
        </div>
    )
}

export default Chat
