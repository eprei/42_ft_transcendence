import TwoFactorVerificationBox from '../components/TFAVerify/TwoFactorVerificationBox'
import styles from './TFA.module.css'

const TFAAuthenticate = () => {
    const url = `${import.meta.env.VITE_URL_BACKEND}/api/auth/2fa/authenticate`

    return (
        <div className={styles.container}>
            <TwoFactorVerificationBox url={url} logOutButton={true} />
        </div>
    )
}

export default TFAAuthenticate
