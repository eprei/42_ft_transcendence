import styles from './AddFriendsBtn.module.css'
import { useState } from 'react'
import { Button, Modal } from 'antd'
import OtherUser from './OtherUsers'

const AddFriendsBtn = ({ otherUsers }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        (
            <>
                <Button
                    className={styles.btn}
                    type="primary"
                    onClick={showModal}
                >
                    Add new friends
                </Button>
                <Modal
                    title="Users who are not yet your friends"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div className={styles.list}>
                        {otherUsers.usersWithNoFriendship.map((otherUsers) => {
                            // const user = otherUsers.user || otherUsers.friend
                            return (
                                <OtherUser
                                    key={otherUsers.id}
                                    id={otherUsers.id}
                                    nickname={otherUsers.nickname}
                                    avatarUrl={otherUsers.avatarUrl}
                                />
                            )
                        })}
                    </div>
                </Modal>
            </>
        )
    )
}

export default AddFriendsBtn
