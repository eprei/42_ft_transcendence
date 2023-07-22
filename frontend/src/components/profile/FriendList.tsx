import styles from './FriendList.module.css'
import Friend from './Friend'

const FriendList = ({ friendList }) => {
    return (
        <div className={styles.container}>
            <h3>Friend list</h3>
            <div className={styles.list}>
                {friendList.listOfFriends.map((friend) => {
                    const user = friend.user || friend.friend
                    return (
                        <Friend
                            key={friend.id}
                            id={friend.id}
                            nickname={user?.nickname}
                            avatarUrl={user?.avatarUrl}
                            status={user?.status}
                            isPending={friend.isPending}
                            createdBy={friend.createdBy?.id}
                        />
                    )
                })}
            </div>
            <h3>Pending acceptance</h3>
            <div className={styles.list}>
                {friendList.listOfPendings.map((FriendshipRequests) => {
                    const user =
                        FriendshipRequests.user || FriendshipRequests.friend
                    return (
                        <Friend
                            key={FriendshipRequests.id}
                            id={FriendshipRequests.id}
                            nickname={user?.nickname}
                            avatarUrl={user?.avatarUrl}
                            status={user?.status}
                            isPending={FriendshipRequests.isPending}
                            createdBy={FriendshipRequests.createdBy?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default FriendList
