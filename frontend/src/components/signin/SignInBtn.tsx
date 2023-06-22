import { Link } from 'react-router-dom'
import styles from './SignInBtn.module.css'

const SigneInBtn = () => {
    return (
        <Link to="/signin" className={styles.btn}>
            Sign in
        </Link>
    )
}

export default SigneInBtn
