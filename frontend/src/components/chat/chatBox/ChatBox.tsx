import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'
import { io } from 'socket.io-client'
import { useAppSelector } from '../../../store/types'
import { useEffect, useState } from 'react'



function ChatBox() {
    const socket = io('http://localhost:8080')
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const [messages, setMesssages] = useState<any[]>([])
    const getAllMsgSocket = () => {
        socket.emit(
            'findAllMsgByChannel',
            currentChatSelected,
            (response: any) => {
                console.log(response)
                setMesssages(response)
            }
        )
    }

    socket.on('incomingMessage', (newMessage: any) => {
        const msgCpy = [...messages]
        msgCpy.push(newMessage)
        setMesssages(msgCpy)
    })

    useEffect(() => {
        if (currentChatSelected) getAllMsgSocket()
        else setMesssages([])
    }, [currentChatSelected])


    return (
        <div className={styles.chatBox}>
            <ChatFeed messages={messages} />
            {currentChatSelected && <SendForm socket={socket} />}
        </div>
    )
}

export default ChatBox
