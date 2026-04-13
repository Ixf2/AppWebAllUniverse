import React from 'react'
import "./Header.css"

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/elements">Elements</a></li>
                    <li><a href="#">Missions</a></li>
                    <li><a href="/about_us">About</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header