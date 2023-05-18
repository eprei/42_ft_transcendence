import React, { useState } from 'react'
import styles from './UserForm.module.css'
import { User } from '../types/user'

const UserForm: React.FC = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value)
    }

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.value)
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const user: User = {
            firstName,
            lastName,
            age: Number(age),
            id: Date.now(),
        }

        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            if (!response.ok) {
                throw new Error('Error creating user')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={handleAgeChange}
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Submit
            </button>
        </form>
    )
}

export default UserForm
