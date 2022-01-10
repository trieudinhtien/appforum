import { NavLink, Routes, Route } from 'react-router-dom'
import styles from './Settings.module.css'
import ChangePassword from './ChangePassword/ChangePassword'

export default function Settings() {


    return (
        <div className=" d-flex">
            <div>
                <div className={styles.main_left}>
                    <h3>You want to ...</h3>
                    <div>
                        <NavLink to="/settings/profile">Change Your Profile</NavLink>
                    </div>
                    <div>
                        <NavLink to="/settings/password">Change Password</NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.main_right + " col mr-0"}>
                <Routes>
                    <Route path="password" element={<ChangePassword />} />
                </Routes>
            </div>
        </div>
    )
}