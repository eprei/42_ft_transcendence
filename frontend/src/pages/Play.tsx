import styles from './Play.module.css'
import { userActions } from '../store/user'
import { useAppDispatch } from '../store/types'
import { UserData } from '../types/UserData'
import { useLoaderData } from 'react-router-dom'
import MatchSystemBtn from '../components/play/MatchSystemBtn'
import { Checkbox } from 'antd'
import { useState } from 'react'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const Play = () => {
    const fetchUserData = useLoaderData() as UserData
    const dispatch = useAppDispatch()
    dispatch(userActions.update({ user: fetchUserData }))

    const [selectedTheme, setSelectedTheme] = useState<string | null>('Theme 1')

    const onChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setSelectedTheme(e.target.value)
        } else {
            setSelectedTheme(null)
        }
    }

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
                throw new Error('Error creating room')
            }

            console.log('Room created successfully')
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
                    <div onClick={createRoom} className={styles.btn}>
                        create room
                    </div>
                </div>
                <div className={styles.bodyRightSide}>
                    <h3>Join an existing room</h3>
                    <MatchSystemBtn />
                    <h1></h1>
                </div>
            </div>
        </div>
    )
}

export default Play
