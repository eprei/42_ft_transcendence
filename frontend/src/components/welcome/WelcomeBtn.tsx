import { Link } from 'react-router-dom'
import styles from './WelcomeBtn.module.css'

const WelcomeBtn = () => {
    return (
        <Link to="/signin" className={styles.btn}>
            Sign in
        </Link>
    )
}

export default WelcomeBtn
