import { NavLink, Routes, Route } from "react-router-dom";
import About from './About/About'
import Settings from '../../Settings/Settings'
import styles from './Navigation.module.css'
import Followings from '../../Followings/Followings'

export default function Navigation() {

    return (
        <>
            <div className={"nav align-items-center " + styles.nav}>
                <div className={styles.divide}></div>
                <NavLink to="/profile/about" className={({isActive}) => isActive ? styles.selected : ''} ><i className="far fa-user-circle"></i></NavLink>
                <div className={styles.divide}></div>
                <NavLink to="/profile/followings" className={({isActive}) => isActive ? styles.selected : ''} ><i className="far fa-smile"></i></NavLink>
                <div className={styles.divide}></div>
                <NavLink to="/profile/settings" className={({isActive}) => isActive ? styles.selected : ''} ><i className="fas fa-cog"></i></NavLink>
                <div className={styles.divide}></div>
            </div>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/settings/*" element={<Settings />} />
                <Route path="/followings/*" element={<Followings />} />
            </Routes>
        </>
    )
}