import { NavLink } from "react-router-dom"
import gmail from '../assets/imgs/gmail.png'

export function AppHeader() {
    return <header className="app-header">
          
        <h1>Coding Academy Gmail App</h1>
        <nav className="header-buttons">
        <img className="compose-icon" 
                        src={gmail} 
                        alt=""
                    />
            <NavLink to="/">Home</NavLink>
            <NavLink to="/aboutus">About</NavLink>
            <NavLink to="/mail">Emails</NavLink>
        </nav>
    </header>
}
