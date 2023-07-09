import styles from './UserBox.module.css'
import User from './User'
import UsersData from './users.json'

function UserList() {
    return (
        <div className={`${styles.usersBox}`}>
            <h2> online </h2>
            {UsersData.map((user) =>
                user.isOnline ? <User key={user.id} user={user} /> : null
            )}

            <h2> offline </h2>
            {UsersData.map((user) =>
                !user.isOnline ? <User key={user.id} user={user} /> : null
            )}
        </div>
    )
}

export default UserList
