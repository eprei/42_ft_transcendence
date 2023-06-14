// import React from 'react'
import styles from './UserList.module.css'
import User from './User'
import { OnlineUserProps } from './User'
import Emiliano from '../../assets/img/epresa-c.jpg'
import Mauro from '../../assets/img/mpons.jpg'
import Robin from '../../assets/img/rburri.jpg'
import Samuel from '../../assets/img/sbars.jpg'
import Theo from '../../assets/img/tgrivel.jpg'

const US: OnlineUserProps[] = [
    {
        id: 1,
        name: 'rburri',
        picture: Robin,
        isPlaying: true,
    },
    {
        id: 2,
        name: 'sbars',
        picture: Samuel,
        isPlaying: false,
    },
    {
        id: 3,
        name: 'mpons',
        picture: Mauro,
        isPlaying: false,
    },
    {
        id: 4,
        name: 'tgrivel',
        picture: Theo,
        isPlaying: true,
    },
    {
        id: 5,
        name: 'epresa-c',
        picture: Emiliano,
        isPlaying: false,
    },
]

function UserList() {
    return (
        <div className={`${styles.usersBox}`}>
            <h2> online users </h2>
            {US.map((US) => (
                <User user={US} />
            ))}
        </div>
    )
}

export default UserList
