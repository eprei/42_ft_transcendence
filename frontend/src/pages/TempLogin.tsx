import TempForm from '../components/tempLogin/TempForm'
import TempPlayerList from '../components/tempLogin/TempPlayerList'
import styles from './TempLogin.module.css'

interface User {
    login: string
    email: string
    avatarUrl: string
}

async function postData(data: User) {
    try {
        const response = await fetch('http://localhost:8080/api/player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to make POST request')
        }

        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.error(error)
    }
}


const TempLogin = () => {
    const submitFormHandler = (params) => {
        
        postData(user).then((responseData) => {
            console.log(responseData)
        })
    }
    return (
        <div className={styles.container}>
            <TempForm submitNewPlayer={submitFormHandler}></TempForm>
            <TempPlayerList></TempPlayerList>
        </div>
    )
}

export default TempLogin
