import styles from './MainProfile.module.css'
import FriendList from '../components/profile/FriendList'
import Statistics from '../components/profile/Statistics'
import UserInformation from '../components/profile/UserInformation'
import { userActions } from '../store/user'
import { useEffect, useState } from 'react'
import AddFriendsBtn from '../components/profile/AddFriendsBtn'
import store from '../store'
import SocketGame from '../sockets/SocketGame'
import { useAppSelector } from '../store/types'
import { UserData } from '../types/UserData'
import { Button } from 'antd'

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
    const [friendList, setFriendList] = useState({
        myId: 0,
        listOfFriends: [],
        listOfPendings: [],
    })

    const [otherUsers, setOtherUsers] = useState({
        usersNotFriends: [],
    })

    const refreshTime: number = 3000

    const [isLoading, setIsLoading] = useState(true)
    const [youHaveAnInvitation, setyouHaveAnInvitation] =
        useState<boolean>(false)
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const [roomInvited, setRoomInvited] = useState<string>('')
    const [userInvitingNickname, setUserInvitingNickname] = useState<string>('')
    const [userInvitingId, setUserInvitingId] = useState<number>(0)
    const socket = SocketGame.getInstance().connect()

    // Management of invitations to play
    useEffect(() => {
        socket.on(
            'receiveInvitation',
            function (data: {
                player_one_nickname: string
                player_one_id: number
                player_two: number
                room: string
            }) {
                if (data.player_two === userData.user.id) {
                    setyouHaveAnInvitation(true)
                    setRoomInvited(data.room)
                    setUserInvitingNickname(data.player_one_nickname)
                    setUserInvitingId(data.player_one_id)
                }
            }
        )

        socket.on(
            'cancelInvitation',
            function (data: { player_two: number; room: string }) {
                if (
                    data.player_two === userData.user.id &&
                    data.room === roomInvited
                ) {
                    setyouHaveAnInvitation(false)
                    setRoomInvited('')
                    setUserInvitingNickname('')
                    setUserInvitingId(0)
                }
            }
        )

        return () => {
            socket.off('receiveInvitation')
            socket.off('cancelInvitation')
        }
    }, [roomInvited, userInvitingNickname])

    useEffect(() => {
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
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }

        fetchFriends() // Initial call
        const intervalId = setInterval(fetchFriends, refreshTime) //Periodic call every 3 seconds

        // Cleaning the interval when the component is disassembled
        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
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
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }

        fetchOtherUsers()
        const intervalId = setInterval(fetchOtherUsers, refreshTime)

        return () => clearInterval(intervalId)
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const acceptInvitation = () => {}

    const declineInvitation = () => {
        socket.emit('declineInvitation', {
            player_one: userInvitingId,
            player_two: userData.user.nickname,
            room: roomInvited,
        })
        setyouHaveAnInvitation(false)
    }

    return (
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
            {youHaveAnInvitation && (
                <div className={styles.overlay}>
                    <h4>you have received an invitation</h4>
                    <h4>to play from {userInvitingNickname}</h4>
                    <div className={styles.buttonContainer}>
                        <Button
                            className={styles.btn}
                            type="primary"
                            onClick={acceptInvitation}
                        >
                            Accept
                        </Button>
                        <Button
                            className={styles.btn}
                            type="primary"
                            onClick={declineInvitation}
                        >
                            Decline
                        </Button>
                    </div>
                </div>
            )}
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
