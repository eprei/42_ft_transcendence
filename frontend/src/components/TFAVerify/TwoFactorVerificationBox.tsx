import styles from './TwoFactorVerificationBox.module.css'
import { useState } from 'react'

interface TwoFactorVerificationBoxProps {
    url: string
}

const TwoFactorVerificationBox = ({ url }: TwoFactorVerificationBoxProps) => {
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const [errorMessage, setErrorMessage] = useState('')

    const handleVerificationCodeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newVerificationCode = [...verificationCode]
        newVerificationCode[index] = event.target.value
        setVerificationCode(newVerificationCode)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const code = verificationCode.join('')
        const body = JSON.stringify({ twoFactorAuthenticationCode: code })

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
                credentials: 'include',
            })

            const data = await response.json()
            console.log(data)

            if (
                data.error === 'Unauthorized' &&
                data.message === 'Wrong authentication code'
            ) {
                setErrorMessage('Wrong code')
                console.log('Wrong code')
            } else {
                setErrorMessage('')
                console.log('Valid code')
				window.location.href = 'http://localhost:4040/profile'
            }

            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleClear = () => {
        setVerificationCode(['', '', '', '', '', ''])
        setErrorMessage('')
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <span className={styles.close}>X</span>

            <div className={styles.info}>
                <span className={styles.title}>Two-Factor Verification</span>
                <p className={styles.description}>
                    Enter the two-factor authentication code provided by the
                    authenticator app
                </p>
            </div>

            <div className={styles['input-fields']}>
                <input
                    maxLength={1}
                    type="tel"
                    placeholder=""
                    value={verificationCode[0]}
                    onChange={(event) => handleVerificationCodeChange(event, 0)}
                    className={styles.input}
                />
                <input
                    maxLength={1}
                    type="tel"
                    placeholder=""
                    value={verificationCode[1]}
                    onChange={(event) => handleVerificationCodeChange(event, 1)}
                    className={styles.input}
                />
                <input
                    maxLength={1}
                    type="tel"
                    placeholder=""
                    value={verificationCode[2]}
                    onChange={(event) => handleVerificationCodeChange(event, 2)}
                    className={styles.input}
                />
                <input
                    maxLength={1}
                    type="tel"
                    placeholder=""
                    value={verificationCode[3]}
                    onChange={(event) => handleVerificationCodeChange(event, 3)}
                    className={styles.input}
                />
                <input
                    maxLength={1}
                    type="tel"
                    placeholder=""
                    value={verificationCode[4]}
                    onChange={(event) => handleVerificationCodeChange(event, 4)}
                    className={styles.input}
                />
                <input
                    maxLength={1}
                    type="tel"
                    placeholder=""
                    value={verificationCode[5]}
                    onChange={(event) => handleVerificationCodeChange(event, 5)}
                    className={styles.input}
                />
            </div>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles['action-btns']}>
                <button type="submit" className={styles.verify}>
                    Verify
                </button>
                <a href="#" className={styles.clear} onClick={handleClear}>
                    Clear
                </a>
            </div>
        </form>
    )
}

export default TwoFactorVerificationBox
