import { useState, useEffect } from 'react'
import TempPlayerLi from './TempPlayerLi'
import styles from './TempPlayerList.module.css'

interface Player {
    login: string
    email: string
    avatarUrl: string
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

const TempPlayerList = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        getUsers().then((users) => {
            setPlayers(users)
            console.log(users)
        })
    }, [])

    let content: JSX.Element[] | JSX.Element = <p>No Player Found!</p>
    if (players.length > 0) {
        content = players.map((player: Player) => <TempPlayerLi key={player.login} player={player}></TempPlayerLi>);
    }

    return (
        <div className={styles.container}>
            <ul>{content}</ul>
        </div>
    )
}

export default TempPlayerList
