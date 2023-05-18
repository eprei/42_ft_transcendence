import React from 'react'
import styles from './UserListItem.module.css'
import { User } from '../types/user'

interface UserListItemProps {
    user: User
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
    return (
        <li className={styles.listItem}>
            {user.firstName} {user.lastName} - Age: {user.age}
        </li>
    )
}

export default UserListItem
