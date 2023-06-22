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
                    <div className={styles.leftcontainer}>
                    {isLoggedIn && (<NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Sign in
                        </NavLink>)}
                        {isLoggedIn && (<NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Profile
                        </NavLink>)}
                        {isLoggedIn && (<NavLink
                            to="/history"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Match history
                        </NavLink>)}
                        {isLoggedIn && (<NavLink
                            to="/chat"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Chat
                        </NavLink>)}
                        {isLoggedIn && (<NavLink
                            to="/game"
                            className={({ isActive }) =>
                                isActive ? styles.active : undefined
                            }
                        >
                            Game
                        </NavLink>)}
                    </div>
                    <div className={styles.rightContainer}>
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
