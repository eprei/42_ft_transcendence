import styles from '../ChannelLi.module.css'
import { Channel } from '../../../../types/Channel'
import IconPrivate from '../../../../assets/icon/lock.svg'
import ChannelType from '../../../../types/ChannelType'
import { useAppDispatch, useAppSelector } from '../../../../store/types'
import { UserData } from '../../../../types/UserData'
import { io } from 'socket.io-client'
import { chatActions } from '../../../../store/chat'

interface DiscoverItemProps {
    channel: Channel
    getAllChannels: () => void
}

const DiscoverItem = (props: DiscoverItemProps) => {
    const socket = io('http://localhost:8080')
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const dispatch = useAppDispatch()
    const joinChannel = () => {
        socket.emit('joinChannel', props.channel.id, userData.user.id, () => {
            dispatch(chatActions.selectChat(props.channel.id))
            props.getAllChannels()
        })
    }

    const handleClick = () => {
        joinChannel()
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
                {props.channel.type === ChannelType.Private ? (
                    <img
                        src={IconPrivate}
                        alt="Private Channel"
                        className={styles.privateIcon}
                    />
                ) : null}
            </div>
        </li>
    )
}

export default DiscoverItem
