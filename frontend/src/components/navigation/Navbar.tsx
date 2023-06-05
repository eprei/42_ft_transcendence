import styles from './Navbar.module.css'
import NavLink from './NavLink'
import Logo from '../../assets/42.svg'

const Navbar = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.containers}>
                    <ul>
                        <li>
                            <NavLink locationPath="/" linkName="CosmicPong" />
                        </li>
                        <li>
                            <NavLink
                                locationPath="/profile"
                                linkName="Profile"
                            />
                        </li>
                        <li>
                            <NavLink
                                locationPath="/history"
                                linkName="Match history"
                            />
                        </li>
                        <li>
                            <NavLink locationPath="/chat" linkName="Chat" />
                        </li>
                        <li>
                            <NavLink locationPath="/game" linkName="Game" />
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
