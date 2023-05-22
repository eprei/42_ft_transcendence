import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <Link to="/" className={styles.links}>
                                CosmicPong
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link to="/profile" className={styles.links}>
                                Profile
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link to="/history" className={styles.links}>
                                History
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link to="/chat" className={styles.links}>
                                Chat
                            </Link>
                        </li>
                        <li className={styles.li}>
                            <Link to="/game" className={styles.links}>
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
