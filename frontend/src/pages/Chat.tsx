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
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const newSocket = SocketChatService.getInstance().connect()
        if (newSocket !== undefined) {
            setSocket(newSocket)

            newSocket.on('incomingMessages', (newMessages: any) => {
                setMesssages(newMessages)
            })
            newSocket.on('newChannel', () => {
                getAllChannels()
            })

            return () => {
                newSocket.off('newChannel')
                newSocket.off('incomingMessage')
            }
        } else {
            console.log('Socket not connected')
        }
    }, [])

    useEffect(() => {
        if (socket !== undefined) {
            getAllChannels()
        }
    }, [socket])

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

    const createNewChannel = (channel: CreateChannel) => {
        if (socket !== undefined) {
            socket.emit('createNewChannel', channel, (channelId: number) => {
                dispatch(chatActions.selectChat(channelId))
            })
            setTimeout(() => {
                getAllChannels()
            }, 300)
        }
    }

    const getAllChannels = () => {
        if (socket !== undefined) {
            socket.emit('getAllChannels', (response: any) => {
                const allChannels = response
                setAllChan(allChannels)
            })
        }
    }

    const handleCreation = (channel: CreateChannel) => {
        if (socket !== undefined) createNewChannel(channel)
    }

    const leaveChannel = (channelId: number) => {
        if (socket !== undefined) {
            socket.emit('leaveChannel', channelId, userData.user.id, () => {
                dispatch(chatActions.selectChat(0))
                getAllChannels()
            })
        }
    }
    const deleteChannel = (channelId: number) => {
        if (socket !== undefined) {
            socket.emit('deleteChannel', channelId, userData.user.id, () => {
                dispatch(chatActions.selectChat(0))
                getAllChannels()
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
                    dispatch(chatActions.selectChat(channelId))
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

    const getChUsers = () => {
        if (socket !== undefined) {
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
                            dispatch(chatActions.selectChat(response.id))
                        }, 300)
                    }
                }
            )
        }
    }

    const blockUser = (targetUserId: number) => {
        if (socket !== undefined) {
            socket.emit(
                'blockUser',
                userData.user.id,
                targetUserId,
                (response: { message: string }) => {
                    if (response) {
                        dispatch(chatActions.selectChat(0))
                        getAllChannels()
                        setReloadUsers(true)
                    }
                }
            )
        }
    }

    const unblockUser = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const getBlockedUsers = () => {
        if (socket !== undefined) {
            socket.emit(
                'getBlockedUsers',
                userData.user.id,
                (response: any) => {
                    setBlockedUsers(response)
                }
            )
        }
    }

    const setAdmin = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const unsetAdmin = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const kickUser = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const banUser = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const unbanUser = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const muteUser = (targetUserId: number) => {
        if (socket !== undefined) {
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
    }

    const getMutedUsers = () => {
        if (socket !== undefined) {
            socket.emit(
                'getMutedUsers',
                currentChatSelected,
                (response: number[]) => {
                    setMutedUsers(response)
                }
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
