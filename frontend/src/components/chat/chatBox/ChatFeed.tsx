import { useEffect, useState, useRef } from 'react'
import Msg from './Msg'
import styles from './ChatFeed.module.css'
import {  useAppSelector } from '../../../store/types'



interface ChatFeedProps {
    socket: any
}

const ChatFeed = ({ socket }: ChatFeedProps) => {
    const isFeedFull = useRef<HTMLDivElement>(null)
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number

    socket.on('incomingMessage', (newMessage: any) => {
        const msgCpy = [...msgs]
        msgCpy.push(newMessage)
        setMsgs(msgCpy)
    })
    
    const [msgs, setMsgs] = useState<any[]>([])

    useEffect(() => {
        if (currentChatSelected) getAllMsgSocket()
        else setMsgs([])
    }, [currentChatSelected])

    useEffect(() => {
        isFeedFull.current?.scrollIntoView()
    }, [msgs])

    const getAllMsgSocket = () => {
        socket.emit('findAllMsgByChannel', currentChatSelected, (response: any) => {
            console.log(response)
            setMsgs(response)
        })
    }

    return (
        <div className={styles.container}>
            {msgs.map((msg) => (
                <Msg key={msg.id} msg={msg}></Msg>
            ))}
            <div ref={isFeedFull}></div>
        </div>
    )
}

export default ChatFeed
