import { Link } from 'react-router-dom'
import styles from './CreateRoomBtn.module.css'

const CreateRoomBtn = () => {
    return (
        <Link to="/history" className={styles.btn}>
            create room
        </Link>
    )
}

export default CreateRoomBtn
