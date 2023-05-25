import styles from './MainSection.module.css'
import WelcomeBtn from './WelcomeBtn'

const MainSection: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cosmic Pong</h1>
            <p className={styles.p}>
                The coolest way to play pong and test our skills as developers
                at the same time
            </p>
            <WelcomeBtn></WelcomeBtn>
        </div>
    )
}

export default MainSection
