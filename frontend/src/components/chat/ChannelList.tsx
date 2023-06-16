import styles from './ChannelList.module.css'
import IconAddChannel from '../../assets/icon/add_friend.svg'
// import ClickableIcon from '../profile/ClickableIcon'

// interface ChannelProps {
//     id: number
// 	owner: number
//     name: string
// 	type: channelType
// 	password: string
// 	creationDate: number
// }

// // ennum channelType [
// // 	private,
// // public,
// // direct,

// const ChList: ChannelProps[] = [
//     {
// 			id: 1,
// 			owner: 2,//User.id
// 			name: Tips and Tricks
// 			type: PUBLIC,
// 			password: '',
// 			creationDate: 040422
// 	},
// 	{
// 		id: 1,
// 		owner: 2,//User.id
// 		name: Tips and Tricks
// 		type: PUBLIC,
// 		password: '',
// 		creationDate: 040422
// 	},
// 	{
// 		id: 1,
// 		owner: 2,//User.id
// 		name: Tips and Tricks
// 		type: PUBLIC,
// 		password: '',
// 		creationDate: 040422
// 	},
// 	{
// 		id: 1,
// 		owner: 2,//User.id
// 		name: Tips and Tricks
// 		type: PUBLIC,
// 		password: '',
// 		creationDate: 040422
// 	},
// 	{
// 		id: 1,
// 		owner: 2,//User.id
// 		name: Tips and Tricks
// 		type: PUBLIC,
// 		password: '',
// 		creationDate: 040422
// 	},
// ]


function ChannelList() {
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
                    
					<h2> Public Channel list </h2>
					<li className={`${styles.chList} ${styles.silent}`}>
                        #Architecture
                    </li>
                    <li className={`${styles.chList}`}>#PrivateChannel on ne le voit pas si on le connait pas</li>
                    <li className={`${styles.chList}`}>#Design (icon cadenas)</li>
                    <li className={`${styles.chList} ${styles.incomingMsg}`}>
                        #PongTrics
                    </li>
                    <li className={`${styles.chList}`}>#React</li>
                    <li className={`${styles.chList}`}>#TypeORM</li>
                </ul>
            </div>
        </>
    )
}

export default ChannelList
