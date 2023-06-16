// import React from 'react'
import styles from './UserList.module.css'
import User from './User'
import UsersData from './users.json';
// import { OnlineUserProps } from './User'

// const fs = require('fs')

// function readDb(dbName = 'users.json') {
//     // read JSON object from file
//     const data = fs.readFileSync(dbName, 'utf8')
//     return JSON.parse(data)
// }

// function writeDb(obj: any, dbName = 'users.json') {
//     if (!obj) return console.log('Please provide data to save')
//     try {
//         fs.writeFileSync(dbName, JSON.stringify(obj)) //overwrites current data
//         return console.log('SAVE SUCESS')
//     } catch (err) {
//         return console.log('FAILED TO WRITE')
//     }
// }

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
