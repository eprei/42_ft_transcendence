import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/icon/42.svg'

const Navbar = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? styles.active : undefined
                                }
                            >
                                Cosmic Pong
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? styles.active : undefined
                                }
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/history"
                                className={({ isActive }) =>
                                    isActive ? styles.active : undefined
                                }
                            >
                                Match history
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/chat"
                                className={({ isActive }) =>
                                    isActive ? styles.active : undefined
                                }
                            >
                                Chat
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/game"
                                className={({ isActive }) =>
                                    isActive ? styles.active : undefined
                                }
                            >
                                Game
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={styles.containers}>
                    <a href="https://42lausanne.ch/" target="_blank">
                        <img src={Logo} alt="42 logo" />
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
