import { useState } from "react"
import "./Header.css"
import roundedLogo from '../../data/images/round-logo.svg'
import hamburgerIcon from '../../data/images/Hamburger_icon.svg'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(prev => !prev)
    const closeMenu = () => setMenuOpen(false)

    return (
        <header>
            <a href="/home" id="header-logo">
                <img src={roundedLogo} alt="" />
            </a>

            <nav className={menuOpen ? "nav-open" : ""}>
                <ul>
                    <li><a href="/home" onClick={closeMenu}>Home</a></li>
                    <li><a href="/elements" onClick={closeMenu}>Elements</a></li>
                    <li><a href="/missions" onClick={closeMenu}>Missions</a></li>
                    <li><a href="/about_us" onClick={closeMenu}>About</a></li>
                </ul>
            </nav>

            <button
                id="hamburger-btn"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                <img src={hamburgerIcon} alt="Menu" />
            </button>
        </header>
    )
}

export default Header