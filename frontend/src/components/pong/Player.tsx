import styles from './Player.module.css'
import { useEffect, useState } from 'react'
import { UserData } from '../../types/UserData'

const Player = ({ userId }: { userId: number }) => {
    const [userData, setUserData] = useState<UserData>({} as UserData)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
    }, [])

    async function getCurrentUser() {
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/id/${userId}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )
            if (!response.ok) {
                throw new Error('Failed to fetch user')
            }
            const data = await response.json()
            setUserData({ user: data })
            setLoading(false)
        } catch (error) {
            // TODO handle error
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    const profilePictureStyle = {
        backgroundImage: `url(${userData.user.avatarUrl})`,
        backgroundSize: 'cover',
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.profilePicture}
                style={profilePictureStyle}
            ></div>
            <li>{userData.user.nickname}</li>
        </div>
    )
}

export default Player
