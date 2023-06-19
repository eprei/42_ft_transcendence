import {
    isRouteErrorResponse,
    useRouteError,
} from '../../../node_modules/react-router-dom/dist/index'
import Navbar from '../navigation/Navbar'
import styles from './Error.module.css'
import ErrorDisplay from './ErrorDisplay'

const ErrorPage = () => {
    const error = useRouteError()
    let title = '404'
    let text = "This page doesn't exists."
    if (isRouteErrorResponse(error)) {
        if (error.status === 401) {
            title = error.status.toString()
            text = error.data.message
        }
    }
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
