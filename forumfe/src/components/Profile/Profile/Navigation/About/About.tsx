import moment from 'moment'
import { useContext } from 'react'
import { UserContext } from '../../../../../context/UserContext'
import styles from './About.module.css'

export default function About() {

    const context = useContext(UserContext)
    const user = context.user

    return (
        <div className={styles.outer + " d-flex justify-content-between"}>
            <div className={styles.main_left}>
                <h3>About Me</h3>
                <p className={styles.introduce}>{user.introduce}</p>
            </div>
            <div className={styles.main_center}>
                <h3>Interests</h3>
                <p>Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy, The Last Windbender, Game of Wars.</p>
            </div>
            <div className={styles.main_right}>
                <h3>Personal Info</h3>
                <div className="d-flex flex-wrap">
                    <p className="col-4 text-muted">Email</p>
                    <p className="col-8">{user.email}</p>
                    <p className="col-4 text-muted">Birthday</p>
                    <p className="col-8">{moment(user.birthday).format('LL')}</p>
                    <p className="col-4 text-muted">Phone</p>
                    <p className="col-8">{user.phone}</p>
                    <p className="col-4 text-muted">Address</p>
                    <p className="col-8">{user.address}</p>
                </div>
            </div>
        </div>
    )
}