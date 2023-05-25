import { Link, useLocation } from 'react-router-dom'
import styles from './NavLink.module.css'

interface LinkProps {
    location_path: string
    linkName: string
}

function NavLink(props: LinkProps) {
    const location = useLocation()

    return (
        <>
            <Link
                to={props.location_path}
                className={
                    location.pathname === props.location_path
                        ? styles.current
                        : ''
                }
            >
                {props.linkName}
            </Link>
        </>
    )
}

export default NavLink
