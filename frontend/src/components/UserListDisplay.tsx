import React from 'react'
import styles from './UserListDisplay.module.css'
import UserListItem from './UserListItem'
import { Users } from '../types/users'
import UserList from './UserList'

interface UserListDisplayProps {
    users: Users
}

const UserListDisplay: React.FC<UserListDisplayProps> = ({ users }) => {
    let listContent = <p className={styles.message}>No user found.</p>
    if (users.length > 0)
        listContent = (
            <ul className={styles.userList}>
                {users.map((user) => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </ul>
        )
    return (
        <div className={styles.container}>
            <UserList></UserList>
            <div>{listContent}</div>
        </div>
    )
}

export default UserListDisplay
