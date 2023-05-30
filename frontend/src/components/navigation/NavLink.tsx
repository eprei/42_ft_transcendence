import { Link, useLocation } from 'react-router-dom'
import styles from './NavLink.module.css'

interface LinkProps {
    locationPath: string
    linkName: string
}

function NavLink({ locationPath, linkName }: LinkProps) {
    const location = useLocation()

    return (
        <>
            <Link
                to={locationPath}
                className={
                    location.pathname === locationPath ? styles.current : ''
                }
            >
                {linkName}
            </Link>
        </>
    )
}

export default NavLink
