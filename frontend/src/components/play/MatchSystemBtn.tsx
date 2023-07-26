import styles from './MatchSystemBtn.module.css'
import { useState, useEffect } from 'react'
import { Progress } from 'antd'

const MatchSystemBtn = () => {
    const [fetching, setFetching] = useState(false)
    const [percent, setPercent] = useState<number>(0)
    const [roomNotFound, setRoomNotFound] = useState<boolean>(false)
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [youAreAlreadyPlaying, setYouAreAlreadyPlaying] =
        useState<boolean>(false)

    useEffect(() => {
        if (!fetching) {
            return
        }

        const interval = setInterval(() => {
            setPercent((prevPercent) => {
                const newPercent = prevPercent + 1
                if (newPercent >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return newPercent
            })
        }, 100) // Increment the percentage every 100 milliseconds

        const timer = setTimeout(() => {
            setRoomNotFound(true)
            clearInterval(interval)
            setShowMessage(true)
        }, 10000) // Set roomNotFound to true after 10 seconds

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [fetching])

    useEffect(() => {
        if (showMessage) {
            const messageTimer = setTimeout(() => {
                setShowMessage(false)
            }, 4000) // Hide the message after 3 seconds

            return () => clearTimeout(messageTimer)
        }
    }, [showMessage])

    useEffect(() => {
        if (youAreAlreadyPlaying) {
            const messageTimer = setTimeout(() => {
                setYouAreAlreadyPlaying(false)
            }, 4000) // Hide the message after 3 seconds

            return () => clearTimeout(messageTimer)
        }
    }, [youAreAlreadyPlaying])

    const joinRandomRoom = async () => {
        try {
            setFetching(true)
            setRoomNotFound(false)

            const response = await fetch(
                `http://localhost:8080/api/room/joinroom/random`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            )
            if (!response.ok) {
                if (response.status === 409) {
                    setYouAreAlreadyPlaying(true)
                } else {
                    throw new Error('Error joining random room')
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setFetching(false)
        }

        console.log('Random room successfully joined')
    }

    return (
        <div className={styles.container}>
            {fetching && !roomNotFound && (
                <div className={styles.overlay}>
                    <>
                        <Progress
                            type="circle"
                            percent={percent}
                            style={{ marginRight: 8 }}
                            showInfo={false}
                            success={{ strokeColor: 'black' }}
                        />
                        <h4>
                            We are looking for a free room that you can join to
                            play
                        </h4>
                        <h6>
                            Meanwhile, you can play practice your victory
                            dance...
                        </h6>
                    </>
                </div>
            )}
            {/* TODO remove overalay with the message */}
            {roomNotFound && (
                <div className={styles.overlay}>
                    {showMessage && (
                        <>
                            <h4>We have not found an available room</h4>
                            <h4> Please try again later</h4>
                        </>
                    )}
                </div>
            )}

            {youAreAlreadyPlaying && (
                <>
                    <div className={styles.overlay}>
                        <h4>It looks like you are already playing</h4>
                        <h4>in another window or tab</h4>
                    </div>
                </>
            )}

            {!fetching && !youAreAlreadyPlaying && (
                <div className={styles.btn} onClick={() => joinRandomRoom()}>
                    launch the matching system
                </div>
            )}
        </div>
    )
}

export default MatchSystemBtn
