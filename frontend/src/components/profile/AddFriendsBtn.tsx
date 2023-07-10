import styles from './AddFriendsBtn.module.css'
import { useState } from 'react'
import { Button, Modal } from 'antd'
import { FriendProps } from './Friend'
import Friend from './Friend'
interface FriendListProps {
    otherUsers: FriendProps[]
}

const AddFriendsBtn = ({ otherUsers }: FriendListProps) => {


	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
	  setIsModalOpen(true);
	};

	const handleOk = () => {
	  setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
	  <>
		<Button className={styles.btn} type="primary" onClick={showModal}>
			Add new friends
		</Button>
		<Modal title="Users who are not yet your friends" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
		<div className={styles.list}>
                {otherUsers.map((friend)=> (
                    <Friend
                        key={friend.id}
                        id={friend.id}
                        nickname={friend.nickname}
                        avatarUrl={friend.avatarUrl}
                        status={friend.status}
                        isPending={!friend.isPending}
                    />
                ))}
            </div>
		</Modal>
	  </>
	);
}

export default AddFriendsBtn
