import React from 'react'
import styles from './UserListItem.module.css'
import { User } from '../types/user'

interface UserListItemProps {
    user: User
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
    const deleteUser = async () => {
        console.log(user.id)
        try {
            const response = await fetch(
                `http://localhost:8080/users/${user.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }
            )
            if (!response.ok) {
                throw new Error('Failed to delete user')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <li className={styles.listItem} onClick={deleteUser}>
            {user.firstName} {user.lastName} - Age: {user.age}
        </li>
    )
}

export default UserListItem
