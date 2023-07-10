import styles from './FriendList.module.css'
import Friend from './Friend'
import { FriendProps } from './Friend'

interface FriendListProps {
    friendsRecoveredFromBackend: FriendProps[]
}

const FriendList = ({ friendsRecoveredFromBackend }: FriendListProps) => {
    const filteredFriends = friendsRecoveredFromBackend.filter(
        (friend) => !friend.isPending
    )

    const filteredFriendshipRequests = friendsRecoveredFromBackend.filter(
        (friend) => friend.isPending
    )

    return (
        <div className={styles.container}>
            <h3>Friend list</h3>
            <div className={styles.list}>
                {filteredFriends.map((friend) => (
                    <Friend
                        key={friend.id}
                        id={friend.id}
                        nickname={friend.nickname}
                        avatarUrl={friend.avatarUrl}
                        status={friend.status}
                        isPending={!friend.isPending}
                    />
                ))}
            </div>
            <h3>Pending acceptance</h3>
            <div className={styles.list}>
                {filteredFriendshipRequests.map((FriendshipRequests) => (
                    <Friend
                        key={FriendshipRequests.id}
                        id={FriendshipRequests.id}
                        nickname={FriendshipRequests.nickname}
                        avatarUrl={FriendshipRequests.avatarUrl}
                        status={FriendshipRequests.status}
                        isPending={!FriendshipRequests.isPending}
                    />
                ))}
            </div>
        </div>
    )
}

export default FriendList
