
import { HashRouter as Router, Route, Routes } from "react-router-dom"

import { Home } from './pages/Home';
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";

import { AppHeader } from "./cmps/AppHeader"

export function App() {
    return <Router>
        <AppHeader/>
        
        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/email" element={<EmailIndex/>}/>
                <Route path="/email/:id" element={<EmailDetails/>}/>
            </Routes>
        </main>

    </Router>
}

