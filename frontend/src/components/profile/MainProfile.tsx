import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from './SeeMatchHistoryBtn'
import FriendList from './FriendList'
import Statistics from './Statistics'
import UserInformation from './UserInformation'
import { useEffect, useState } from 'react'

export interface UserData {
    login: string;
    avatarUrl: string;
    nbVictory: number;
    totalPlay: number;
	xp: number,
    TFAEnabled: boolean;
  }

export interface UserInformationProps {
    userData: UserData;
  }

const MainProfile = () => {

	const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserData>({} as UserData);

    useEffect(() => {
        getCurrentUser();
    }, []);

    async function getCurrentUser() {
        try {
            const response = await fetch(`http://localhost:8080/api/user/me`, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user ME')
            }
            console.log("WELL FETCHED")
            const data = await response.json();
            setUserData(data);
			setLoading(false);

        } catch (error) {
            console.log('Error:', error);
        }
    }

	if (loading) {
		return <div>Loading...</div>;
	}

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserInformation userData={userData}/>
                    <Statistics userData={userData}/>
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
