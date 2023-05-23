import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    const location = useLocation()
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <Link
                                to="/"
                                className={
                                    location.pathname === '/'
                                        ? styles.current
                                        : ''
                                }
                            >
                                CosmicPong
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link
                                to="/profile"
                                className={
                                    location.pathname === '/profile'
                                        ? styles.current
                                        : ''
                                }
                            >
                                Profile
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link
                                to="/history"
                                className={
                                    location.pathname === '/history'
                                        ? styles.current
                                        : ''
                                }
                            >
                                History
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link
                                to="/chat"
                                className={
                                    location.pathname === '/chat'
                                        ? styles.current
                                        : ''
                                }
                            >
                                Chat
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link
                                to="/game"
                                className={
                                    location.pathname === '/game'
                                        ? styles.current
                                        : ''
                                }
                            >
                                Game
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.containers}>
                    <h1 className={styles.logo}>42</h1>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
