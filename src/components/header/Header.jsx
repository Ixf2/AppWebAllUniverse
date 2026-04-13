import "./Header.css"
import roundedLogo from '../../data/images/round-logo.svg'

function Header() {
    return (
        <header>
            <a href="/home" id="header-logo">
                <img  src={roundedLogo} alt="" />
            </a>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/elements">Elements</a></li>
                    <li><a href="/missions">Missions</a></li>
                    <li><a href="/about_us">About</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header