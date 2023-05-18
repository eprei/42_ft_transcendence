import React from 'react'
import styles from './UserList.module.css'

const UserList: React.FC = () => {
    const handleGetUsers = () => {
        // Fetch users from the server or perform any desired action
        console.log('Fetching users...')
    }

    return (
        <div className={styles.container}>
            <button className={styles.getUsersButton} onClick={handleGetUsers}>
                Get Users
            </button>
        </div>
    )
}

export default UserList
