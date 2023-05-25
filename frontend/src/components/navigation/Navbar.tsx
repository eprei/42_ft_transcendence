import styles from './Navbar.module.css'
import NavLink from './NavLink'

const Navbar: React.FC = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <NavLink location_path="/" linkName="CosmicPong" />
                        </li>
                        <li className={styles.li}>
                            <NavLink
                                location_path="/profile"
                                linkName="Profile"
                            />
                        </li>
                        <li className={styles.li}>
                            <NavLink
                                location_path="/history"
                                linkName="Match history"
                            />
                        </li>
                        <li className={styles.li}>
                            <NavLink location_path="/chat" linkName="Chat" />
                        </li>
                        <li className={styles.li}>
                            <NavLink location_path="/game" linkName="Game" />
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
