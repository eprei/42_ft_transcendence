import React from 'react'
import styles from './CenteredDiv.module.css'
import UserForm from './UserForm'
import UserList from './UserList'
import UserListDisplay from './UserListDisplay'
import { Users } from '../types/users'

const userList: Users = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
    },
]

const CenteredDiv: React.FC = () => {
    return (
        <div className={styles.centeredDiv}>
            <UserForm></UserForm>
            <UserListDisplay users={userList}></UserListDisplay>
        </div>
    )
}

export default CenteredDiv
