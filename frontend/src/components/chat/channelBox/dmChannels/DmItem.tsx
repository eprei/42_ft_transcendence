import styles from '../ChannelLi.module.css'
import { Channel } from '../../../../types/Channel'
import IconLeaveChannel from '../../../../assets/icon/block_user.svg'
import { useAppSelector, useAppDispatch } from '../../../../store/types'
import { UserData } from '../../../../types/UserData'
import { io } from 'socket.io-client'
import { chatActions } from '../../../../store/chat'

interface DmItemProps {
    channel: Channel
    getAllChannels: () => void
}

const DmItem = (props: DmItemProps) => {
    const socket = io('http://localhost:8080')
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(chatActions.selectChat(props.channel.id))
    }

    const LeaveChannel = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        socket.emit('leaveChannel', props.channel.id, userData.user.id, () => {
            dispatch(chatActions.selectChat(0))
            props.getAllChannels()
        })
    }

    return (
        <li
            className={`${styles.li} ${
                props.channel.id === currentChatSelected ? styles.active : ''
            }`}
            onClick={handleClick}
        >
            <div className={styles.text}>{props.channel.name}</div>
            <div className={styles.iconsContainer}>
                {
                    <img
                        src={IconLeaveChannel}
                        alt="LeaveChannel"
                        className={styles.addChannelIcon}
                        onClick={LeaveChannel}
                    />
                }
            </div>
        </li>
    )
}

export default DmItem
