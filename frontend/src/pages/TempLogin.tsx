import { useState } from 'react'
import TempForm from '../components/tempLogin/TempForm'
import TempPlayerList from '../components/tempLogin/TempPlayerList'
import styles from './TempLogin.module.css'
import { Player } from '../types/Player'

async function deletePlayer(first_name: string): Promise<void> {
    try {
        const response = await fetch(
            `http://localhost:8080/api/player/${first_name}`,
            {
                method: 'DELETE',
            }
        )

        if (!response.ok) {
            throw new Error('Failed to delete player')
        }

        console.log('Player deleted successfully')
    } catch (error) {
        console.error(error)
    }
}

async function getUsers() {
    try {
        const response = await fetch('http://localhost:8080/api/player')

        if (!response.ok) {
            throw new Error('Failed to fetch users')
        }

        const users = await response.json()
        return users
    } catch (error) {
        console.error(error)
    }
}

async function postData(data: Player) {
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

const TempLogin = () => {
    const [players, setPlayers] = useState<Player[]>([])

    const submitFormHandler = (user: Player) => {
        postData(user).then((responseData) => {
            console.log(responseData)
        })
        setTimeout(() => {
            getUsersHandler()
        }, 500)
    }

    const getUsersHandler = () => {
        getUsers().then((users) => {
            setPlayers(users)
            console.log(users)
        })
    }

    const deletePlayerHandler = (first_name: string) => {
        console.log(first_name)
        deletePlayer(first_name)
        setTimeout(() => {
            getUsersHandler()
        }, 500)
    }

    return (
        <div className={styles.container}>
            <TempForm
                submitNewPlayer={submitFormHandler}
                getUsersHandler={getUsersHandler}
            ></TempForm>
            {
                <TempPlayerList
                    players={players}
                    deletePlayerHandler={deletePlayerHandler}
                ></TempPlayerList>
            }
        </div>
    )
}

export default TempLogin
