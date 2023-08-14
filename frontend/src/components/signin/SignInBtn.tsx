import styles from './SignInBtn.module.css'

const SignInBtn = () => {
    return (
        <a
            href={`${import.meta.env.VITE_URL_BACKEND}/api/auth/42`}
            className={styles['oauth-button']}
        >
            Sign-in with 42
        </a>
    )
}

export default SignInBtn
