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
	createDM: (targetUserId: number) => void
	blockUser: (targetUserId: number) => void
	unblockUser: (targetUserId: number) => void
	setAdmin: (targetUserId: number) => void
	unsetAdmin: (targetUserId: number) => void
}

const UserBox = (props: UserBoxProps) => {
    const userData = useAppSelector(
        (state: RootState) => state.user.userData
    ) as UserData

	const work = () => {
        if (props.admins) {
            alert(JSON.stringify(props.admins, null, 2))
        }
    }

    return (
        <div className={`${styles.usersBox}`}>
            <h2 onClick={work} > online </h2>
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
				isBlocked={props.blockedUsers.includes(user.id)}
				createDM={props.createDM}
				blockUser={props.blockUser}
				unblockUser={props.unblockUser}
				setAdmin={props.setAdmin}
				unsetAdmin={props.unsetAdmin}
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
				isBlocked={props.blockedUsers.includes(user.id)}
				createDM={props.createDM}
				blockUser={props.blockUser}
				unblockUser={props.unblockUser}
				setAdmin={props.setAdmin}
				unsetAdmin={props.unsetAdmin}
			/> : null
			)}
        </div>
    )
}

export default UserBox
