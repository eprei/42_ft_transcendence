import styles from './Navbar.module.css'
import NavLink from './NavLink'
import Logo from '../../assets/icon/icon-42.svg'

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
                    <img src={Logo} alt="42 logo" />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
