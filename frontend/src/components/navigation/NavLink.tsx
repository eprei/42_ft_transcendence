import { Link, useLocation } from 'react-router-dom'
import styles from './NavLink.module.css'

interface LinkProps {
    location_path: string
    linkName: string
}

function NavLink({ location_path, linkName }: LinkProps) {
    const location = useLocation()

    return (
        <>
            <Link
                to={location_path}
                className={
                    location.pathname === location_path ? styles.current : ''
                }
            >
                {linkName}
            </Link>
        </>
    )
}

export default NavLink
