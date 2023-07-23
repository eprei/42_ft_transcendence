import styles from './Play.module.css'
import { userActions } from '../store/user'
import { useAppDispatch } from '../store/types'
import { UserData } from '../types/UserData'
import { useLoaderData } from 'react-router-dom'
import MatchSystemBtn from '../components/play/MatchSystemBtn'
import CreateRoomBtn from '../components/play/CreateRoomBtn'

const Play = () => {
    const fetchUserData = useLoaderData() as UserData
    const dispatch = useAppDispatch()
    dispatch(userActions.update({ user: fetchUserData }))

    return (
        <div className={styles.container}>
            <h1>Game Launcher</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <h3>Create new room</h3>
                    <h5>map 1</h5>
                    <h5>map 2</h5>
                    <h5>map 3</h5>
                    <CreateRoomBtn />
                </div>
                <div className={styles.bodyRightSide}>
                    <h3>Join an existing room</h3>
                    <MatchSystemBtn />
                    <h1></h1>
                </div>
            </div>
        </div>
    )
}

export default Play
