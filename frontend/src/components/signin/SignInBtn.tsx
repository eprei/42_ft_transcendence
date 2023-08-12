import styles from './SignInBtn.module.css'

const SignInBtn = () => {
    return (
        <a
            href="${process.env.REACT_APP_URL_BACKEND}/auth/42"
            className={styles['oauth-button']}
        >
            Sign-in with 42
        </a>
    )
}

export default SignInBtn
