import * as React from 'react'
import { useState } from 'react'

import styles from './TempForm.module.css'

interface Player {
    login: string
    email: string
    avatarUrl: string
}

interface TempFormProps {
    submitNewPlayer: (user: Player) => void;
    getPlayers: () => void;

}

const TempForm = (props: TempFormProps) => {
    const [enteredName, setEnteredName] = useState('')
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPicUrl, setEnteredPicUrl] = useState('')

    const nameChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
        setEnteredName(e.currentTarget.value)
    }

    const emailChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
        setEnteredEmail(e.currentTarget.value)
    }

    const urlChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
        setEnteredPicUrl(e.currentTarget.value)
    }

    const submitFormHandler = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault()
        if (
            enteredEmail.trim().length > 0 &&
            enteredName.trim().length > 0 &&
            enteredPicUrl.trim().length > 0
        ) {
            const user = {
                login: enteredName,
                email: enteredEmail,
                avatarUrl: enteredPicUrl,
            }
            props.submitNewPlayer(user);   
        }
        setEnteredName('')
        setEnteredEmail('')
        setEnteredPicUrl('')
    }

    return (
        <div className={styles.container}>
            <form
                autoComplete="off"
                className={styles.form}
                onSubmit={submitFormHandler}
            >
                <h2>Sign In Now</h2>
                <div className={styles.inputLabelPair}>
                    <label htmlFor="login">42 Login name:</label>
                    <input
                        type="text"
                        name="login"
                        id="login"
                        onChange={nameChangeHandler}
                        value={enteredName}
                    />
                </div>
                <div className={styles.inputLabelPair}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={emailChangeHandler}
                        value={enteredEmail}
                    />
                </div>
                <div className={styles.inputLabelPair}>
                    <label htmlFor="pic-url">Pic url:</label>
                    <input
                        type="text"
                        name="pic-url"
                        id="pic-url"
                        onChange={urlChangeHandler}
                        value={enteredPicUrl}
                    />
                </div>
                <button type="submit" className={styles.btn}>
                    Add User
                </button>
                <button className={styles.btn} onClick={props.getPlayers}>
                    Get User
                </button>
            </form>
        </div>
    )
}

export default TempForm
