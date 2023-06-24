import { Link } from 'react-router-dom'
import styles from './SignInBtn.module.css'

const SignInBtn = () => {
    return (
        <Link to="/profile" className={styles.btn}>
            Sign in
        </Link>
    )
}

export default SigneInBtn
