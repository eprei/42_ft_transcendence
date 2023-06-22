import Navbar from '../navigation/Navbar'
import styles from './Error.module.css'
import ErrorDisplay from './ErrorDisplay'

const ErrorPage = () => {
    let title = '404'
    let text = "This page doesn't exist."
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.container}>
                <ErrorDisplay title={title} text={text}></ErrorDisplay>
            </div>
        </>
    )
}

export default ErrorPage
