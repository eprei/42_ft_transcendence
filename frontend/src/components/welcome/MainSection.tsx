import styles from "./MainSection.module.css"

const MainSection = () => {
	return (
        <div className={styles.container}>
            <h1>Cosmic Pong</h1>
            <p className={styles.p}>
                The coolest way to play pong and test our skills as developers
                at the same time
            </p>
            <button>Sign in</button>
        </div>
    )
}
 
export default MainSection;