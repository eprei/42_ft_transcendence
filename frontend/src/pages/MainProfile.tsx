import styles from './MainProfile.module.css'
import FriendList from '../components/profile/FriendList'
import Statistics from '../components/profile/Statistics'
import UserInformation from '../components/profile/UserInformation'
import { userActions } from '../store/user'
import { useEffect, useState } from 'react'
import AddFriendsBtn from '../components/profile/AddFriendsBtn'
import store from '../store'
import InvitationHandler from '../sockets/InvitationHandler'
import SocketGame from '../sockets/SocketGame'

export interface friendList {
    myId: number
    listOfFriends: {
        id: number
        isPending: boolean
        user: {
            id: number
            nickname: string
            avatarUrl: string
            status: 'online' | 'offline' | 'playing'
        }[]
    }
    listOfPendings: {
        id: number
        isPending: boolean
        user: {
            id: number
            nickname: string
            avatarUrl: string
            status: 'online' | 'offline' | 'playing'
        }[]
    }
}
const MainProfile = () => {
    const socket = SocketGame.getInstance().connect()
    const [reload, setReload] = useState<boolean>(true)
    const [friendList, setFriendList] = useState({
        myId: 0,
        listOfFriends: [],
        listOfPendings: [],
    })

    const [otherUsers, setOtherUsers] = useState({
        usersNotFriends: [],
    })

    useEffect(() => {
        socket.on('reload', function () {
            setReload(true)
        })
        return () => {
            socket.off('reload')
        }
    }, [])

    useEffect(() => {
        if (reload) {
            fetchFriends()
            fetchOtherUsers()
            setReload(false)
        }
    }, [reload])

    const fetchFriends = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/getFriendsAndRequests`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Error fetching friends')
            }

            const data = await response.json()
            const { myId, listOfFriends, listOfPendings } = data

            setFriendList({
                myId,
                listOfFriends,
                listOfPendings,
            })
        } catch (error) {
            console.error(error)
        }
    }

    const fetchOtherUsers = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/getallnonfriendusers`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Error fetching other users')
            }

            const data = await response.json()
            const { usersNotFriends } = data

            setOtherUsers({
                usersNotFriends,
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <InvitationHandler />
            <div className={styles.container}>
                <h1>Profile</h1>
                <div className={styles.body}>
                    <div className={styles.bodyLeftSide}>
                        <UserInformation />
                        <Statistics />
                        <AddFriendsBtn otherUsers={otherUsers} />
                    </div>
                    <div className={styles.bodyRightSide}>
                        <FriendList friendList={friendList} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProfile

export async function loader() {
    const response = await fetch(`http://localhost:8080/api/user/me`, {
        method: 'GET',
        credentials: 'include',
    })

    if (response.status !== 200) {
        throw new Response(
            JSON.stringify({ message: 'Error fetching user data' }),
            { status: 400 }
        )
    }

    const data = await response.json()
    store.dispatch(userActions.update({ user: data }))
    return data
}
