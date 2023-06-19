import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/icon/42.svg'
import { useAppSelector } from '../../store/types'

const Navbar = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({
                                    isActive,
                                }: {
                                    isActive: boolean
                                }) => (isActive ? styles.active : undefined)}
                            >
                                Cosmic Pong
                            </NavLink>
                        </li>
                        <li>
                            {isLoggedIn && (
                                <NavLink
                                    to="/profile"
                                    className={({
                                        isActive,
                                    }: {
                                        isActive: boolean
                                    }) =>
                                        isActive ? styles.active : undefined
                                    }
                                >
                                    Profile
                                </NavLink>
                            )}
                        </li>
                        <li>
                            {isLoggedIn && (
                                <NavLink
                                    to="/history"
                                    className={({
                                        isActive,
                                    }: {
                                        isActive: boolean
                                    }) =>
                                        isActive ? styles.active : undefined
                                    }
                                >
                                    Match history
                                </NavLink>
                            )}
                        </li>
                        <li>
                            {isLoggedIn && (
                                <NavLink
                                    to="/chat"
                                    className={({
                                        isActive,
                                    }: {
                                        isActive: boolean
                                    }) =>
                                        isActive ? styles.active : undefined
                                    }
                                >
                                    Chat
                                </NavLink>
                            )}
                        </li>
                        <li>
                            {isLoggedIn && (
                                <NavLink
                                    to="/game"
                                    className={({
                                        isActive,
                                    }: {
                                        isActive: boolean
                                    }) =>
                                        isActive ? styles.active : undefined
                                    }
                                >
                                    Game
                                </NavLink>
                            )}
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
