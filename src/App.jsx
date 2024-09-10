import { HashRouter as Router, Route, Routes } from "react-router-dom"
import 'animate.css';

import { Home } from './pages/Home';
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./pages/EmailDetails";
import { UserMsg } from './cmps/UserMsg'
import { EmailComposer } from "./cmps/EmailComposer";
import { AppHeader } from "./cmps/AppHeader"

export function App() {
    return <Router>
            <AppHeader/>
            <UserMsg />

            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/mail" element={<EmailIndex/>}>
                        <Route path="/mail/compose/:id?" element={<EmailComposer/>}/>
                    </Route>
                    <Route path="/mail/:id" element={<EmailDetails/>}/>
                </Routes>
            </main>
    </Router>
}

