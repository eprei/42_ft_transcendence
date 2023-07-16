import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import Msg from './Msg'
import styles from './ChatFeed.module.css'
import { chatIdAtom } from '../channelBox/ChannelLi'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080')

function ChatFeed() {

	const [chatId] = useAtom(chatIdAtom)

	socket.on('incomingMessage', (newMessage) => {
		const msgCpy = [...msgs]
		msgCpy.push(newMessage)
		setMsgs(msgCpy);
		// setMsgs((msgs) => [...msgs, newMessage])

	})
    
    const [msgs, setMsgs] = useState<any[]>([])

    useEffect(() => {
        if (chatId)
			// getChMsgHandler()
			getAllMsgSocket()
        else
			setMsgs([])
    }, [chatId])

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
        </div>
    )
}

export default ChatFeed
