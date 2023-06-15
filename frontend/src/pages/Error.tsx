import styles from './Error.module.css'


const ErrorPage = () => {
    return (
        <div className={styles.container}>
            <h1>An error occured</h1>
            <p>This page doesn't exists.</p>
        </div>
    )
}

export default ErrorPage
