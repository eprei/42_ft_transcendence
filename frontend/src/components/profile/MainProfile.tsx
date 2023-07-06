import styles from './MainProfile.module.css'
import SeeMatchHistoryBtn from './SeeMatchHistoryBtn'
import FriendList from './FriendList'
import Statistics from './Statistics'
import UserInformation from './UserInformation'
import PicturePlaceHolder from '../../assets/img/profil-picture-placeholder.png'
import { useEffect, useState } from 'react'

const MainProfile = () => {

    const [userData, setUserData] = useState(null);

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

            const data = await response.json();
            setUserData(data);

        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <UserInformation
                        picture={PicturePlaceHolder}
                        name="Name placeholder"
                        level={42}
                        TFA={true}
                    />
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
