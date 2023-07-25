import { useEffect, useRef } from 'react'
import Msg from './Msg'
import styles from './ChatFeed.module.css'

interface ChatFeedProps {
    messages: any[]
}

const ChatFeed = ({ messages }: ChatFeedProps) => {
    const isFeedFull = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isFeedFull.current)
            isFeedFull.current.scrollTop = isFeedFull.current?.scrollHeight
    }, [messages])

    return (
        <div className={styles.container} ref={isFeedFull}>
            {messages.map((msg) => (
                <Msg key={msg.id} msg={msg}></Msg>
            ))}
        </div>
    )
}

export default ChatFeed
