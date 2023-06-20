// import React from 'react'
import styles from './UserList.module.css'
import User from './User'
import UsersData from './users.json';

function UserList() {
    return (
        <div className={`${styles.usersBox}`}>
            <h2> online </h2>
            {UsersData.map((userData) => (
				userData.isOnline ? <User user={userData} /> : null
            ))}

            <h2> offline </h2>
			{UsersData.map((userData) => (
				!userData.isOnline ? <User user={userData} /> : null
            ))}
        </div>
    )
}

export default UserList
