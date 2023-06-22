import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/icon/42.svg'
import { useAppSelector } from '../../store/types'

const Navbar = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <div className={styles.containers}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Cosmic Pong
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Match history
                        </NavLink>
                        <NavLink
                            to="/chat"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Chat
                        </NavLink>
                        <NavLink
                            to="/game"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Game
                        </NavLink>
                    </div>
                    <div className={styles.containers}>
                        <div className={styles.imgContainer}>
                            <a href="https://42lausanne.ch/" target="_blank">
                                <img src={Logo} alt="42 logo" />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
