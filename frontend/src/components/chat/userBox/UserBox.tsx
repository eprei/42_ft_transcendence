import styles from './UserBox.module.css'
import User from './User'
import { useAppSelector} from '../../../store/types'
import { UserData } from '../../../types/UserData'
import { RootState } from '../../../store'

interface UserBoxProps {
	users: any[]
	blockedUsers: number[]
	admins: any[]
	owner: any
	bannedUsers: any[]
	createDM: (targetUserId: number) => void
	blockUser: (targetUserId: number) => void
	unblockUser: (targetUserId: number) => void
	setAdmin: (targetUserId: number) => void
	unsetAdmin: (targetUserId: number) => void
	kickUser: (targetUserId: number) => void
	banUser: (targetUserId: number) => void
	unbanUser: (targetUserId: number) => void
}

const UserBox = (props: UserBoxProps) => {
    const userData = useAppSelector(
        (state: RootState) => state.user.userData
    ) as UserData

	const userAlert = () => {
        if (props.admins) {
			// const allInfo = [props.users, props.blockedUsers, props.admins, props.owner] 
			const allInfo = [props.users] 
            alert(JSON.stringify(allInfo , null, 2))
        }
    }

	const banAlert = () => {
        if (props.bannedUsers) {
			// const allInfo = [props.users, props.blockedUsers, props.admins, props.owner] 
			const allInfo = [props.bannedUsers] 
            alert(JSON.stringify(allInfo , null, 2))
        }
    }

    return (
        <div className={`${styles.usersBox}`}>
            <h2 onClick={userAlert} > online </h2>
            {props.users.map((user) =>
                user.status !== 'offline' ? <User
				key={user.id}
				id={user.id}
				nickname={user.nickname}
				avatarUrl={user.avatarUrl}
				status={user.status}
				amIowner={props.owner.id === userData.user.id}
				amIadmin={props.admins.some((admin) => admin.id === userData.user.id)}
				isOwner={props.owner.id === user.id}
				isAdmin={props.admins.some((admin) => admin.id === user.id)}
				// isBlocked={props.blockedUsers.includes(user.id)}
				isBlocked={props.blockedUsers.some((blockedUser) => blockedUser === user.id)}
				isBanned={false}
				createDM={props.createDM}
				blockUser={props.blockUser}
				unblockUser={props.unblockUser}
				setAdmin={props.setAdmin}
				unsetAdmin={props.unsetAdmin}
				kickUser={props.kickUser}
				banUser={props.banUser}
				unbanUser={props.unbanUser}
			/> : null
            )}
            <h2> offline </h2>
            {props.users.map((user) =>
                user.status === 'offline' ? <User
				key={user.id}
				id={user.id}
				nickname={user.nickname}
				avatarUrl={user.avatarUrl}
				status={user.status}
				amIowner={props.owner.id === userData.user.id}
				amIadmin={props.admins.some((admin) => admin.id === userData.user.id)}
				isOwner={props.owner.id === user.id}
				isAdmin={props.admins.some((admin) => admin.id === user.id)}
				isBlocked={props.blockedUsers.some((blockedUser) => blockedUser === user.id)}
				isBanned={false}
				createDM={props.createDM}
				blockUser={props.blockUser}
				unblockUser={props.unblockUser}
				setAdmin={props.setAdmin}
				unsetAdmin={props.unsetAdmin}
				kickUser={props.kickUser}
				banUser={props.banUser}
				unbanUser={props.unbanUser}
			/> : null
			)}
			<h2 onClick={banAlert}> banned </h2>
			{props.bannedUsers.map((banUser) =>
                <User 
				key={banUser.id}
				id={banUser.id}
				nickname={banUser.nickname}
				avatarUrl={banUser.avatarUrl}
				status={banUser.status}
				amIowner={props.owner.id === userData.user.id}
				amIadmin={props.admins.some((admin) => admin.id === userData.user.id)}
				isOwner={props.owner.id === banUser.id}
				isAdmin={props.admins.some((admin) => admin.id === banUser.id)}
				isBlocked={props.blockedUsers.some((blockedUser) => blockedUser === banUser.id)}
				isBanned={true}
				createDM={props.createDM}
				blockUser={props.blockUser}
				unblockUser={props.unblockUser}
				setAdmin={props.setAdmin}
				unsetAdmin={props.unsetAdmin}
				kickUser={props.kickUser}
				banUser={props.banUser}
				unbanUser={props.unbanUser}
			/>
			)}
        </div>
    )
}

export default UserBox
