import { useEffect, useState, useRef } from 'react'
import { useAtom } from 'jotai'
import Msg from './Msg'
import styles from './ChatFeed.module.css'
import { chatIdAtom } from '../channelBox/ChannelLi'

interface ChatFeedProps {
    socket: any
}

const ChatFeed = ({ socket }: ChatFeedProps) => {
    const isFeedFull = useRef<HTMLDivElement>(null)
    const [chatId] = useAtom(chatIdAtom)

    socket.on('incomingMessage', (newMessage: any) => {
        const msgCpy = [...msgs]
        msgCpy.push(newMessage)
        setMsgs(msgCpy)
    })

    const [msgs, setMsgs] = useState<any[]>([])

    useEffect(() => {
        if (chatId) getAllMsgSocket()
        else setMsgs([])
    }, [chatId])

    useEffect(() => {
        isFeedFull.current?.scrollIntoView()
    }, [msgs])

    const getAllMsgSocket = () => {
        socket.emit('findAllMsgByChannel', chatId, (response: any) => {
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
