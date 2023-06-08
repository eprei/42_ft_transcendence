import * as React from 'react'
import { useState } from 'react'

import styles from './TempForm.module.css'

interface User {
    login: string
    email: string
    avatarUrl: string
}

async function postData(data: User) {
    try {
        const response = await fetch('http://localhost:8080/api/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to make POST request')
        }

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error(error)
    }
}

const TempForm = () => {
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
            const user: User = {
                login: enteredName,
                email: enteredEmail,
                avatarUrl: enteredPicUrl,
            }
            postData(user).then((responseData) => {
                console.log(responseData)
            })
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
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default TempForm
