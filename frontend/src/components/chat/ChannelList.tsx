import styles from './ChannelList.module.css'
import IconAddChannel from '../../assets/icon/add_friend.svg'
// import ClickableIcon from '../profile/ClickableIcon'

function ChannelList() {
    return (
        <>
            <div className={`${styles.chBox}`}>
                <h2> channel list </h2>

                <ul>
                    <li>
                        <button className={`${styles.chList} ${styles.newCh}`}>
                            Create new channel
                            <img
                                src={IconAddChannel}
                                alt="plus sign"
                                className={styles.addChannelIcon}
                            />
                        </button>
                    </li>
                    <li className={`${styles.chList} ${styles.silent}`}>
                        #PublicChannel1
                    </li>
                    <li className={`${styles.chList}`}>#PrivateChannel1</li>
                    <li className={`${styles.chList}`}>#PassProtectChannel</li>
                    <li className={`${styles.chList}`}>#PassProtectChannel2</li>
                    <li className={`${styles.chList} ${styles.incomingMsg}`}>
                        #PongTrics
                    </li>
                    <li className={`${styles.chList}`}>#My team</li>
                    <li className={`${styles.chList}`}>#admin</li>
                </ul>
            </div>
        </>
    )
}

export default ChannelList
