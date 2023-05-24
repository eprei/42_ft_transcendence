import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

interface LinkProps {
    location_path: string
    linkName: string
}

function OurLinkButton(props: LinkProps) {
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

const Navbar = () => {
    const location = useLocation()
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <OurLinkButton
                                location_path="/"
                                linkName="CosmicPong"
                            />
                        </li>
                        <li className={styles.li}>
                            <OurLinkButton
                                location_path="/profile"
                                linkName="Profile"
                            />
                        </li>
                        <li className={styles.li}>
                            <OurLinkButton
                                location_path="/history"
                                linkName="Match history"
                            />
                        </li>
                        <li className={styles.li}>
                            <OurLinkButton
                                location_path="/chat"
                                linkName="Chat"
                            />
                        </li>
                        <li className={styles.li}>
                            <OurLinkButton
                                location_path="/game"
                                linkName="Game"
                            />
                        </li>
                    </ul>
                </div>
                <div className={styles.containers}>
                    <img src="../../public/42.svg" alt="42 logo" />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
