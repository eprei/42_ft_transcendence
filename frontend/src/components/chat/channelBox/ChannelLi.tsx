import styles from './ChannelLi.module.css'
import { Channel } from '../../../types/Channel'
import IconLeaveChannel from '../../../assets/icon/block_user.svg'
import IconPrivate from '../../../assets/icon/lock.svg'
import ChannelType from '../../../types/ChannelType'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { atom } from 'jotai'
import { useAtom } from 'jotai'
import { io } from 'socket.io-client'


interface ChannelLiProps {
    channel: Channel
    type: string
}

export const chatIdAtom = atom(0)

const ChannelLi = (props: ChannelLiProps) => {
	
	const socket = io('http://localhost:8080')
	const [chatId, setChatId] = useAtom(chatIdAtom);
    const userData = useAppSelector((state) => state.user.userData) as UserData
	const myId = userData.user.id
	
	const joinChannel = () => {
		socket.emit('joinChannel', props.channel.id, myId, (response: any) => {
			console.log(response)
			setChatId(props.channel.id)
		})
	}

	const handleClick = () => {
		if (props.type === "discover") {
			joinChannel()
		}	else if (props.channel.id != chatId) {
			setChatId(props.channel.id)
		}
	}

	async function LeaveChannel(event: React.MouseEvent<HTMLImageElement>) {
        event.stopPropagation();
      
        try {
          const response = await fetch(`http://localhost:8080/api/channel/${props.channel.id}/users/${userData.user.id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to make DELETE request');
          }
      
          // Handle success response here
        } catch (error) {
          // Handle error here
          console.error(error);
        }
      }

    return (
		<li className={`${styles.li} ${props.channel.id === chatId ? styles.active : ''}`} onClick={handleClick} >
            <div className={styles.text}>{props.channel.name}</div>
            <div className={styles.iconsContainer}>
                {props.type !== 'discover' && (
                    <img
                        src={IconLeaveChannel}
                        alt="LeaveChannel"
                        className={styles.addChannelIcon}
                        onClick={LeaveChannel}
                    />
                )}
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

export default ChannelLi
