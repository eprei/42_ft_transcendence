import styles from '../ChannelLi.module.css'
import { Channel } from '../../../../types/Channel'
import IconLeaveChannel from '../../../../assets/icon/block_user.svg'
import { useAppSelector, useAppDispatch } from '../../../../store/types'
import { UserData } from '../../../../types/UserData'
import { atom } from 'jotai'
import { useAtom } from 'jotai'
import { io } from 'socket.io-client'
import { chatActions } from '../../../../store/chat'


interface DmItemProps {
    channel: Channel
}

export const joinedChannelAtom = atom(0)

const DmItem = (props: DmItemProps) => {
    const socket = io('http://localhost:8080')
    const [joinedChannel, setJoinedChannel] = useAtom(joinedChannelAtom)
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const dispatch = useAppDispatch()
    const myId = userData.user.id

    const handleClick = () => {
        dispatch(chatActions.selectChat(props.channel.id))
    }

    // async function const LeaveChannel = (event: React.MouseEvent<HTMLImageElement>) => {
    const LeaveChannel = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation()
        socket.emit('leaveChannel', props.channel.id, myId, (response: any) => {
            setJoinedChannel(joinedChannel + 1)
            console.log(response)
            dispatch(chatActions.selectChat(0))
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
