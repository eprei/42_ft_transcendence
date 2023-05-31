import styles from './UserInformation.module.css'

const UserInformation = () => {
    return (
        <div>
            <ul className={styles.verticalList}>
                <li>Name</li>
                <li>Level</li>
                <li>Two-factor authentication</li>
            </ul>
        </div>
    )
}

export default UserInformation
