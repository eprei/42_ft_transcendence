import { MatchList } from '../components/history/MatchList'
import { useAppSelector } from '../store/types'
import { UserData } from '../types/UserData'
import styles from './MatchHistory.module.css'

const MatchHistory = () => {
    const userdata = useAppSelector((state) => state.user.userData) as UserData

    return (
        <div>
            <h1 className={styles.title}>Match History</h1>
            <MatchList userid={userdata.user.id}/>
        </div>
    )
}

export default MatchHistory
