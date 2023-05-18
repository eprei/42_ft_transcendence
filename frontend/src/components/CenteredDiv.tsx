import * as React from 'react'
import { useState } from 'react'
import styles from './CenteredDiv.module.css'
import UserForm from './UserForm'
import UserListDisplay from './UserListDisplay'
import { Users } from '../types/users'
import GetUserBtn from './GetUserBtn'

let userList: Users = []

const CenteredDiv: React.FC = () => {
    const [users, setUsers] = useState(userList)

    const handleGetUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users')
            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className={styles.centeredDiv}>
            <UserForm></UserForm>
            <GetUserBtn getUserHandler={handleGetUsers}></GetUserBtn>
            <UserListDisplay userList={users}></UserListDisplay>
        </div>
    )
}

export default CenteredDiv
