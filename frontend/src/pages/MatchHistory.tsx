import { MatchList } from '../components/history/MatchList'
import { useAppSelector } from '../store/types'
import { UserData } from '../types/UserData'
import styles from './MatchHistory.module.css'

const MatchHistory = () => {
    const userData : UserData = useAppSelector((state) => state.user.userData) as UserData

    return (
        <div>
            <h1 className={styles.title}>Match History</h1>
            <MatchList userData={userData}/>
        </div>
    )
}

export default MatchHistory
