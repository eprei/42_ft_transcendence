import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from '../components/profile/SeeMatchHistoryBtn'
import FriendList from '../components/profile/FriendList'
import Statistics from '../components/profile/Statistics'
import UserInformation from '../components/profile/UserInformation'
import { userActions } from '../store/user'
import { useAppDispatch } from '../store/types'
import { UserData } from '../types/UserData'
import { useLoaderData } from 'react-router-dom'

const MainProfile = () => {
    const fetchUserData = useLoaderData() as UserData
    const dispatch = useAppDispatch()
    dispatch(userActions.update({ user: fetchUserData }))

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserInformation />
                    <Statistics />
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
    const response = await fetch(`http://localhost:8080/api/user/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching user data' }),
            { status: 400 }
        )
    }

    const data = await response.json()
    return data
}
