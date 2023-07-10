import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from '../components/profile/SeeMatchHistoryBtn'
import FriendList from '../components/profile/FriendList'
import Statistics from '../components/profile/Statistics'
import UserInformation from '../components/profile/UserInformation'
import { useEffect, useState } from 'react'
import { userActions } from '../store/user'
import { useAppDispatch, useAppSelector } from '../store/types'


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

const MainProfile = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.user.userData);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCurrentUser()
    }, [])

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
            console.log(`MainProfile => DATA: ${data}`);
            dispatch(userActions.update({ user: data, userPosition: data.userPosition }))
            // console.log(`UserData after: ${userData?.nickname}`);

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
                    <UserInformation userData={userData} />
                    <Statistics userData={userData} />
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
