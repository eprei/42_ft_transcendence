import TempForm from '../components/tempLogin/TempForm'
import TempPlayerList from '../components/tempLogin/TempPlayerList'
import styles from './TempLogin.module.css'

const TempLogin = () => {
    return (
        <div className={styles.container}>
            <TempForm></TempForm>
            <TempPlayerList></TempPlayerList>
        </div>
    )
}

export default TempLogin
