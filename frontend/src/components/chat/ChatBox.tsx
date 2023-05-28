import styles from './ChatBox.module.css'

function ChatBox() {
	return (
	  <>
	 	<div className={styles.chatContainer}>

			<div className={`${styles.chBox}`}>

				<h2> channel list </h2>

				<ul>
					<li className={`${styles.chList} ${styles.newCh}`}>
						Create new channel +
					</li>
					<li className={`${styles.chList}`}>
						Create new channel
					</li>
					<li className={`${styles.chList} ${styles.silent}`}>
						#PublicChannel1
					</li>
					<li className={`${styles.chList}`}>
							#PrivateChannel1
					</li>
					<li className={`${styles.chList}`}>
							#PassProtectChannel
					</li>
					<li className={`${styles.chList}`}>
							#PassProtectChannel2
					</li>
					<li className={`${styles.chList} ${styles.incomingMsg}`}>
							#PongTrics
					</li>
					<li className={`${styles.chList}`}>
							#My team
					</li>
					<li className={`${styles.chList}`}>
							#admin
					</li>
				</ul>
			</div>

			<div className={`${styles.chatFeed}`}>
				<ul>
					<li className={`${styles.activeCh}`}>
							#PongTrics
					</li>
                    <li className={`${styles.inactiveCh}`}>
							#My team
					</li>
					<li className={`${styles.inactiveCh}`}>
							sbars
					</li>
					<li className={`${styles.inactiveCh}`}>
							mpons
					</li>
					</ul>
			</div>

			<div className={`${styles.usersBox}`}>
				<h2> online users </h2>

				<ul>
					<li className={`${styles.uList} ${styles.newCh}`}>
						rburri
					</li>
					<li className={`${styles.uList}`}>
						sbars
					</li>
					<li className={`${styles.uList} ${styles.silent}`}>
						mpons
					</li>
					<li className={`${styles.uList}`}>
						tgrivel
					</li>
					<li className={`${styles.uList}`}>
						epresa-c
					</li>
				</ul>
			</div>

{/* 		
			<div className={`${styles.chatContainer} ${styles.back}`}>
			</div> */}

		</div>
	</>
	)
}

export default ChatBox
