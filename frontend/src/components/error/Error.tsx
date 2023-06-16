import Navbar from '../navigation/Navbar'
import styles from './Error.module.css'
import ErrorDisplay from './ErrorDisplay'

const ErrorPage = () => {
    const title = '404'
    const text = "This page doesn't exists."
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
