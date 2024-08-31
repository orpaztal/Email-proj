import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header">
        <h1>Coding Academy Gmail App</h1>
        <nav className="header-buttons">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/aboutus">About</NavLink>
            <NavLink to="/mail">Emails</NavLink>
        </nav>
    </header>
}
