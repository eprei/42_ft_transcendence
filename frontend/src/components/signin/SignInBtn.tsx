import styles from './SignInBtn.module.css'

const SignInBtn = () => {
	const link = `${process.env.REACT_APP_URL_BACKEND}/auth/42`

    return (
        <a
            href={link}
            className={styles['oauth-button']}
        >
            Sign-in with 42
        </a>
    )
}

export default SignInBtn
