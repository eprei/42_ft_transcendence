import React from 'react'
import styles from './UserListDisplay.module.css'
import UserListItem from './UserListItem'
import { Users } from '../types/users'

interface UserListDisplayProps {
    userList: Users
}

const UserListDisplay: React.FC<UserListDisplayProps> = ({ userList }) => {
    let listContent = <p className={styles.message}>No user found.</p>
    if (userList.length > 0)
        listContent = (
            <ul className={styles.userList}>
                {userList.map((user) => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </ul>
        )
    return (
        <div className={styles.container}>
            <div>{listContent}</div>
        </div>
    )
}

export default UserListDisplay
