import { Link } from 'react-router-dom'
import styles from './SeeMatchHistoryBtn.module.css'

const SeeMatchHistoryBtn = () => {
    return (
        <Link to="/history" className={styles.btn}>
            see match history
        </Link>
    )
}

export default SeeMatchHistory
