import { NavLink, Routes, Route } from 'react-router-dom'
import styles from './Settings.module.css'
import ChangePassword from './ChangePassword/ChangePassword'
import ChangeProfile from './ChangeProfile/ChangeProfile'

export default function Settings() {


    return (
        <div className=" d-flex">
            <div>
                <div className={styles.main_left}>
                    <h3>You want to ...</h3>
                    <div>
                        <NavLink to="/profile/settings/profile">Change Your Profile</NavLink>
                    </div>
                    <div>
                        <NavLink to="/profile/settings/password">Change Password</NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.main_right + " col mr-0"}>
                <Routes>
                    <Route path="password" element={<ChangePassword />} />
                    <Route path="profile" element={<ChangeProfile />} />
                </Routes>
            </div>
        </div>
    )
}