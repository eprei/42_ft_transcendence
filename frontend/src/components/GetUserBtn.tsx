import * as React from 'react'

import styles from './GetUserBtn.module.css'

type ChildComponentProps = {
    getUserHandler: () => void
}
const GetUserBtn: React.FC<ChildComponentProps> = (props) => {
    return (
        <div className={styles.container}>
            <button
                className={styles.getUsersButton}
                onClick={props.getUserHandler}
            >
                Get Users
            </button>
        </div>
    )
}

export default GetUserBtn
