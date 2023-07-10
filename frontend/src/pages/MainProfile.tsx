import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from '../components/profile/SeeMatchHistoryBtn'
import FriendList from '../components/profile/FriendList'
import Statistics from '../components/profile/Statistics'
import UserInformation from '../components/profile/UserInformation'
import { userActions } from '../store/user'
import { useAppDispatch, useAppSelector } from '../store/types'
import { UserData } from '../types/UserData'
import { useLoaderData } from 'react-router-dom'

export interface UserInformationProps {
    userData: UserData
}

const MainProfile = () => {
    const fetchUserData = useLoaderData();
    const dispatch = useAppDispatch()
    dispatch(userActions.update({ user: fetchUserData }))

    const userData = useAppSelector(state => state.user.userData) as UserData

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

export async function loader() {
    try {
        const response = await fetch(`http://localhost:8080/api/user/me`, {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) {
            throw new Error('Failed to fetch user ME')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error:', error)
    }
}
