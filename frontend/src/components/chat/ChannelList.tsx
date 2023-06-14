import { useState } from 'react'

import styles from './ChannelList.module.css'
import IconAddChannel from '../../assets/icon/add_friend.svg'
import ChData from './channels.json'
import NewChannelForm from './NewChannelForm'

function ChannelList() {
    const [showForm, setShowForm] = useState(false)

    const handleClick = () => {
        //   alert("handleClick");
        setShowForm(true)
    }

    return (
        <>
            <div className={`${styles.chBox}`}>
                <ul>
                    <li>
                        <button className={`${styles.chList} ${styles.newCh}`}>
                            Search channel
                            <img
                                src={IconAddChannel}
                                alt="plus sign"
                                className={styles.addChannelIcon}
                            />
                        </button>
                    </li>
                    <li style={{ listStyleType: 'none' }}>
                        <button
                            className={`${styles.chList} ${styles.newCh}`}
                            onClick={handleClick}
                        >
                            Create new channel
                            <img
                                src={IconAddChannel}
                                alt="plus sign"
                                className={styles.addChannelIcon}
                            />
                        </button>
                    </li>
                    {showForm && <NewChannelForm />}

                    <h2> Public channel list </h2>
                    {ChData.map((ch) =>
                        ch.type === 'Public' ? (
                            <li
                                className={`${styles.chList} ${styles.incomingMsg}`}
                            >
                                {ch.name}
                            </li>
                        ) : null
                    )}
                    {/*If Password set -> ajouter icon cadenas*/}
                </ul>
            </div>
        </>
    )
}

export default ChannelList

//
// interface ChannelProps {
//     id: number
// 	owner: number
//     name: string
// 	type: channelType
// 	password: string
// 	creationDate: string
// }
//
// ennum channelType [
// 	private,
// public,
// direct,
