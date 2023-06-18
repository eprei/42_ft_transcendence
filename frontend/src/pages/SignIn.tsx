import styles from './SignIn.module.css'

const SignIn = () => {
    return (
        <div className="signIn">
            <a
                href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-148ab253d8e4595378ee6c5fc7bbb8c318c3359652d6b6508c71f2abf0bfceaf&redirect_uri=http%3A%2F%2Flocalhost%3A4040%2Ftmp&response_type=code"
                className={styles['oauth-button']}
            >
                Sign-in with 42
            </a>
        </div>
    )
}

export default SignIn
