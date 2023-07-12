import { useEffect, useState } from 'react'
import styles from './MainProfile.module.css'
import Statistics from '../components/profile/Statistics'
import { useParams } from 'react-router-dom'
import UserLambdaInformation from '../components/UserLambda/UserLambdaInformation'

export interface UserData {
    user: {
        nickname: string
        avatarUrl: string
        nbVictory: number
        totalPlay: number
        xp: number
        TFAEnabled: boolean
    }
    userPosition: number
}

export interface UserInformationProps {
    userData: UserData
}

const UserLambda = () => {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<UserData>({} as UserData)
    const { nickname } = useParams<{ nickname: string }>()

    useEffect(() => {
        getCurrentUser()
    }, [])

    async function getCurrentUser() {
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/nickname/${nickname}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )
            if (!response.ok) {
                throw new Error('Failed to fetch user')
            }
            const data = await response.json()
            setUserData({ user: data, userPosition: data.userPosition })
            setLoading(false)
        } catch (error) {
            console.log('Error:', error)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserLambdaInformation userData={userData} />
                    <Statistics userData={userData} />
                </div>
            </div>
        </div>
    )
}

export default UserLambda
