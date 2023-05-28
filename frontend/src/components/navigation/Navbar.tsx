import styles from './Navbar.module.css'
import NavLink from './NavLink'

const Navbar = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul>
                        <li>
                            <NavLink location_path="/" linkName="CosmicPong" />
                        </li>
                        <li>
                            <NavLink
                                location_path="/profile"
                                linkName="Profile"
                            />
                        </li>
                        <li>
                            <NavLink
                                location_path="/history"
                                linkName="Match history"
                            />
                        </li>
                        <li>
                            <NavLink location_path="/chat" linkName="Chat" />
                        </li>
                        <li>
                            <NavLink location_path="/game" linkName="Game" />
                        </li>
                    </ul>
                </div>
                <div className={styles.containers}>
                    <img src="/42.svg" alt="42 logo" />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
