import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import About from './About/About'
import Settings from '../../Settings/Settings'
import styles from './Navigation.module.css'

export default function Navigation() {

    return (
        <BrowserRouter>
            <div className={"nav " + styles.nav}>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/settings" >Settings</NavLink>
                <NavLink to="/followings" >Followings</NavLink>
            </div>
            <Routes>
                <Route path="/about" element={<About/>} />
                <Route path="/settings/*" element={<Settings/>} />
            </Routes>
        </BrowserRouter>
    )
}