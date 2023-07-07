import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from './SeeMatchHistoryBtn'
import FriendList from './FriendList'
import Statistics from './Statistics'
import UserInformation from './UserInformation'
import { useEffect, useState } from 'react'

export interface UserData {
    login: string
    avatarUrl: string
    nbVictory: number
    totalPlay: number
    xp: number
    TFAEnabled: boolean
}

export interface UserInformationProps {
    userData: UserData
}

const MainProfile = () => {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<UserData>({} as UserData)

    useEffect(() => {
        getCurrentUser()
    }, [])

    useEffect(() => {
        console.log('data : ', userData)
        console.log('userData.login : ', userData.login)
    }, [userData])

    async function getCurrentUser() {
        try {
            const response = await fetch(`http://localhost:8080/api/user/me`, {
                method: 'GET',
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch user ME')
            }
            const data = await response.json()
            setUserData(data)
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
            <h1>Profile</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserInformation userData={userData.rest} />
                    <Statistics userData={userData.rest} />
                    <SeeMatchHistoryBtn />
                </div>
                <div className={styles.bodyRightSide}>
                    <FriendList />
                </div>
            </div>
        </div>
    )
}

export default MainProfile
