import styles from './ChannelList.module.css'

function ChannelList() {
    return (
        <>
            <div className={`${styles.chBox}`}>
                <h2> channel list </h2>

                <ul>
                    <li className={`${styles.chList} ${styles.newCh}`}>
                        Create new channel +
                    </li>
                    <li className={`${styles.chList}`}>Create new channel</li>
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
