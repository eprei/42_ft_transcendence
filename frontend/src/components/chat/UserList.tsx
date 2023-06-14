// import React from 'react'
import styles from './UserList.module.css'
import User from './User'
// import { UserProps } from './User'

{
    /* const UserList = () => { */
}
function UserList() {
    return (
        <div className={`${styles.usersBox}`}>
            <h2> online users </h2>
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
        </div>
    )
}

export default UserList

{
    /* <ul>
					<li><User /> </li>
					<li><User /> </li>
					</ul> */
}
{
    /* Le enviamos los parametros
						<User        
                            key={usersRecoveredFromBackend.id}
                            id={usersRecoveredFromBackend.id}
                            name={usersRecoveredFromBackend.name}
                            picture={usersRecoveredFromBackend.picture}
                            status={usersRecoveredFromBackend.status}
                            isUser={usersRecoveredFromBackend.isUser}
                        /> */
}

// import ClickableIcon from '../profile/ClickableIcon'
// import IconViewProfile from '../../assets/icon/view_profile.svg'
// import IconInviteToPlay from '../../assets/icon/invite_to_play.svg'
// import IconBlockUser from '../../assets/icon/block_user.svg'
// import IconMsg from '../../assets/icon/message.svg'
// import IconGenericPicture from '../../assets/icon/generic_picture.svg'

{
    /* 
import styles from './UserList.module.css'
import User from './User'
import PicturePlaceHolder from '../../assets/img/profil-picture-placeholder.png'
import { UserProps } from './User'

const usersRecoveredFromBackend: UserProps[] = [
    {
        id: 1,
        name: 'rburri',
        picture: PicturePlaceHolder,
        status: 'playing',
        isUser: true,
    },
    {
        id: 2,
        name: 'sbars',
        picture: PicturePlaceHolder,
        status: 'online',
        isUser: true,
    },
    {
        id: 3,
        name: 'mpons',
        picture: PicturePlaceHolder,
        status: 'offline',
        isUser: true,
    },
    {
        id: 4,
        name: 'tgrivel',
        picture: PicturePlaceHolder,
        status: 'offline',
        isUser: true,
    },
]

const otherUsersRecoveredFromBackend: UserProps[] = [
    {
        id: 5,
        name: 'epresa-c',
        picture: PicturePlaceHolder,
        status: 'offline',
        isUser: false,
    },
    {
        id: 6,
        name: 'mdavis',
        picture: PicturePlaceHolder,
        status: 'online',
        isUser: false,
    },
] */
}

{
    /* <div className={styles.container}>
            <div className={styles.subtitle}>User list</div>
            <div className={styles.list}>
                {usersRecoveredFromBackend.map(
                    (usersRecoveredFromBackend) => (
                        <User
                            key={usersRecoveredFromBackend.id}
                            id={usersRecoveredFromBackend.id}
                            name={usersRecoveredFromBackend.name}
                            picture={usersRecoveredFromBackend.picture}
                            status={usersRecoveredFromBackend.status}
                            isUser={usersRecoveredFromBackend.isUser}
                        />
                    )
                )}
            </div>
            <div className={styles.subtitle}>Other users</div>
            <div className={styles.list}>
                {otherUsersRecoveredFromBackend.map(
                    (otherUsersRecoveredFromBackend) => (
                        <User
                            key={otherUsersRecoveredFromBackend.id}
                            id={otherUsersRecoveredFromBackend.id}
                            name={otherUsersRecoveredFromBackend.name}
                            picture={otherUsersRecoveredFromBackend.picture}
                            status={otherUsersRecoveredFromBackend.status}
                            isUser={otherUsersRecoveredFromBackend.isUser}
                        />
                    )
                )}
            </div>
        </div> */
}
