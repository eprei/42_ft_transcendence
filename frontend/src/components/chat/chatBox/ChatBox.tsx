import styles from './ChatBox.module.css'
import ChatFeed from './ChatFeed.tsx'
import SendForm from './SendForm.tsx'
import { NewMsg } from '../../../pages/Chat'
import { ReceivedMsg } from '../../../pages/Chat'

interface ChatBoxProps {
    currentChatSelected: number
    messages: ReceivedMsg[]
    sendMessage: (NewMsg: NewMsg) => void
}

function ChatBox(props: ChatBoxProps) {
    return (
        <div className={styles.chatBox}>
            <ChatFeed messages={props.messages} />
            {props.currentChatSelected > 0 && (
                <SendForm sendMessage={props.sendMessage} />
            )}
        </div>
    )
}

export default ChatBox
