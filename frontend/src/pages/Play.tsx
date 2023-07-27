import styles from './Play.module.css'
import MatchSystemBtn from '../components/play/MatchSystemBtn'
import { Checkbox } from 'antd'
import { useState, useEffect } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const Play = () => {

    const [selectedTheme, setSelectedTheme] = useState<string>('Theme 1')
    const [youAreAlreadyPlaying, setYouAreAlreadyPlaying] =
        useState<boolean>(false)

    const onChange = (e: CheckboxChangeEvent) => {
        setSelectedTheme(e.target.value)
    }

    useEffect(() => {
        if (youAreAlreadyPlaying) {
            const messageTimer = setTimeout(() => {
                setYouAreAlreadyPlaying(false)
            }, 4000) // Hide the message after 4 seconds

            return () => clearTimeout(messageTimer)
        }
    }, [youAreAlreadyPlaying])

    const createRoom = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ theme: selectedTheme }),
            })

            if (!response.ok) {
                if (response.status === 409) {
                    setYouAreAlreadyPlaying(true)
                } else {
                    throw new Error('Error creating room')
                }
            }

            console.log('Room created successfully')
            // TODO redirect to game page
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Game Launcher</h1>
            <div className={styles.body}>
                <div className={styles.bodyLeftSide}>
                    <h3>Create new room</h3>
                    <div className={styles.columns}>
                        <Checkbox
                            value="Theme 1"
                            onChange={onChange}
                            checked={selectedTheme === 'Theme 1'}
                        >
                            <h4>Theme 1</h4>
                        </Checkbox>
                        <Checkbox
                            value="Theme 2"
                            onChange={onChange}
                            checked={selectedTheme === 'Theme 2'}
                        >
                            <h4>Theme 2</h4>
                        </Checkbox>
                        <Checkbox
                            value="Theme 3"
                            onChange={onChange}
                            checked={selectedTheme === 'Theme 3'}
                        >
                            <h4>Theme 3</h4>
                        </Checkbox>
                    </div>
                    <button onClick={createRoom} className={styles.btn}>
                        create room
                    </button>
                </div>
                <div className={styles.bodyRightSide}>
                    <h3>Join an existing room</h3>
                    <MatchSystemBtn />
                    <h1></h1>
                </div>
            </div>
            {youAreAlreadyPlaying && (
                <div className={styles.overlay}>
                    <h4>It looks like you are already playing</h4>
                    <h4>in another window or tab</h4>
                </div>
            )}
        </div>
    )
}

export default Play
