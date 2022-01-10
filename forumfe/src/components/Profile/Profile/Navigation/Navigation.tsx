import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import About from './About/About'
import Settings from '../../Settings/Settings'
import styles from './Navigation.module.css'

export default function Navigation() {

    return (
        <>
            <div className={"nav " + styles.nav}>
                <NavLink to="/profile/about" >About</NavLink>
                <NavLink to="/profile/settings" >Settings</NavLink>
                <NavLink to="/profile/followings" >Followings</NavLink>
            </div>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/settings/*" element={<Settings />} />
            </Routes>
        </>
    )
}