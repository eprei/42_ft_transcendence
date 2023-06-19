import styles from './SignIn.module.css'

const SignIn = () => {
    return (
	<div className={styles['center']}>
            	<a href="http://localhost:8080/api/auth/42" className={styles['oauth-button']}>
                	Sign-in with 42
		</a>
        </div>
    )
}

export default SignIn
