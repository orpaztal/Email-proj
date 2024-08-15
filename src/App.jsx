
import { HashRouter as Router, Route, Routes } from "react-router-dom"

import { Home } from './pages/Home';
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";

import { AppFooter } from "./cmps/AppFooter"
import { AppHeader } from "./cmps/AppHeader"

export function App() {
    return <Router>
        <AppHeader/>
        
        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/email" element={<EmailIndex/>}/>
            </Routes>
        </main>

        <AppFooter/>
    </Router>
}

