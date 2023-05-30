import styles from './MainProfile.module.css'

const MainProfile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.boxBackground}>
                <div className={styles.title}>
                    <h1>Profile</h1>
                </div>
                    <div>
                        <div className={styles.leftSide}>
                            <h3>Here goes the profile</h3>
                        </div>
                        <div className={styles.friendList}>
                            <h3>Here goes the friends section</h3>
                        </div>
                </div>
            </div> 
        </div>
    )
}

export default MainProfile
