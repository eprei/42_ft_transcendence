import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import Msg from './Msg'
import styles from './ChatFeed.module.css'
import { chatIdAtom } from '../channelBox/ChannelLi'

function ChatFeed() {

	const [chatId] = useAtom(chatIdAtom)

    async function getChMsgs() {
        try {
            const response = await fetch(
                `http://localhost:8080/api/message/${chatId}/msg`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Failed to fetch current channel msg')
            }

            const messages = await response.json()
            return messages
        } catch (error) {
            console.error(error)
        }
    }

    const [msgs, setMsgs] = useState<any[]>([])

    useEffect(() => {
        if (chatId)
			getChMsgHandler()
        else
			setMsgs([])
    }, [chatId])

    const getChMsgHandler = () => {
        getChMsgs().then((msgs) => {
            setMsgs(msgs)
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
