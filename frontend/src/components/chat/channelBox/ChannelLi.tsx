import styles from './ChannelLi.module.css'
import { Channel } from '../../../types/Channel'
import IconLeaveChannel from '../../../assets/icon/block_user.svg'
import IconPrivate from '../../../assets/icon/lock.svg'
import ChannelType from '../../../types/ChannelType'

interface ChannelLiProps {
    channel: Channel
    type: string
}

const ChannelLi = (props: ChannelLiProps) => {
    return (
        <li className={styles.li}>
            <div className={styles.text}>{props.channel.name}</div>
            <div className={styles.iconsContainer}>
                {props.type !== 'discover' && (
                    <img
                        src={IconLeaveChannel}
                        alt="LeaveChannel"
                        className={styles.addChannelIcon}
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
