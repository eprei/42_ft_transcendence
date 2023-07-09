import styles from './ChannelLi.module.css'
import { Channel } from '../../../types/Channel'
import IconLeaveChannel from '../../../assets/icon/block_user.svg'
import ChannelTypes from '../../../types/ChannelTypes'
import IconPrivate from '../../../assets/icon/lock.svg'

interface ChannelLiProps {
    channel: Channel
}

const ChannelLi = (props: ChannelLiProps) => {
    return (
        <li className={styles.li}>
            <div className={styles.text}>{props.channel.name}</div>
            <div>
                <img
                    src={IconLeaveChannel}
                    alt="LeaveChannel"
                    className={styles.addChannelIcon}
                />
                {props.channel.type === ChannelTypes.Private ? (
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
