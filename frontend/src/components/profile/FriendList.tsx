import styles from './FriendList.module.css'
import Friend from './Friend'
import PicturePlaceHolder from '../../assets/img/profil-picture-placeholder.png'
import { FriendProps } from './Friend'

const friendsRecoveredFromBackend: FriendProps[] = [
    {
        id: 1,
        name: 'rburri',
        picture: PicturePlaceHolder,
        status: 'playing',
        isFriend: true,
    },
    {
        id: 2,
        name: 'sbars',
        picture: PicturePlaceHolder,
        status: 'online',
        isFriend: true,
    },
    {
        id: 3,
        name: 'mpons',
        picture: PicturePlaceHolder,
        status: 'offline',
        isFriend: true,
    },
    {
        id: 4,
        name: 'tgrivel',
        picture: PicturePlaceHolder,
        status: 'offline',
        isFriend: true,
    },
]

const otherUsersRecoveredFromBackend: FriendProps[] = [
    {
        id: 5,
        name: 'epresa-c',
        picture: PicturePlaceHolder,
        status: 'offline',
        isFriend: false,
    },
    {
        id: 6,
        name: 'mdavis',
        picture: PicturePlaceHolder,
        status: 'online',
        isFriend: false,
    },
]

const FriendList = () => {
    return (
        <div className={styles.container}>
            <h3>Friend list</h3>
            <div className={styles.list}>
                {friendsRecoveredFromBackend.map(
                    (friendsRecoveredFromBackend) => (
                        <Friend
                            key={friendsRecoveredFromBackend.id}
                            id={friendsRecoveredFromBackend.id}
                            name={friendsRecoveredFromBackend.name}
                            picture={friendsRecoveredFromBackend.picture}
                            status={friendsRecoveredFromBackend.status}
                            isFriend={friendsRecoveredFromBackend.isFriend}
                        />
                    )
                )}
            </div>
            <h3>Other users</h3>
            <div className={styles.list}>
                {otherUsersRecoveredFromBackend.map(
                    (otherUsersRecoveredFromBackend) => (
                        <Friend
                            key={otherUsersRecoveredFromBackend.id}
                            id={otherUsersRecoveredFromBackend.id}
                            name={otherUsersRecoveredFromBackend.name}
                            picture={otherUsersRecoveredFromBackend.picture}
                            status={otherUsersRecoveredFromBackend.status}
                            isFriend={otherUsersRecoveredFromBackend.isFriend}
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default FriendList
