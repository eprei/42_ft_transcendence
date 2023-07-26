import { MatchList } from '../components/history/MatchList'
import styles from './MatchHistory.module.css'

const MatchHistory = () => {
    return (
        <div>
            <h1 className={styles.title}>Match History</h1>
            <MatchList />
        </div>
    )
}

export default MatchHistory
