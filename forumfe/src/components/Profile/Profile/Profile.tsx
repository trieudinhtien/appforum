import styles from "./Profile.module.css"
import { useContext } from "react"
import Navigation from "./Navigation/Navigation"
import { UserContext } from '../../../context/UserContext'

export default function Profile() {

    const context = useContext(UserContext)
    const user = context.user
    console.log("context", context)

    return (
        <div className={styles.profile}>
            <div className={styles.profile_inner}>
                <img className={styles.profile_inner_img} src={user && user.cover} alt="cover" />
                <img className={styles.profile_inner_avatar} src={user && user.avatar} alt="avatar" />
                <div className={"d-flex align-items-center " + styles.profile_inner_description}>
                    <div className={"d-flex col align-items-center " + styles.description_inner}>
                        <div className={"text-center " + styles.des_left}>
                            <p className={"m-0"}>10</p>
                            <p className={"text-muted"}>POSTS</p>
                        </div>
                        <div className={styles.divide}></div>
                        <div className={"text-center " + styles.des_left}>
                            <p className={"m-0"}>{user.followings.length}</p>
                            <p className={"text-muted"}>FOLLOWINGS</p>
                        </div>
                        <div className={styles.divide}></div>
                        <div className={"text-center " + styles.des_left}>
                            <p className={"m-0"}>10</p>
                            <p className={"text-muted"}>FOLLOWERS</p>
                        </div>
                    </div>
                    <div className={"text-center col " + styles.description_inner}>
                        <div className={"" + styles.des_name}>
                            {user.firstName + " " + user.lastName}
                            <i className="fas fa-check-circle pl-2" style={{ fontSize: '20px', color: '#1DA1F2' }}></i>
                        </div>
                        <div className={"" + styles.des_email}>
                            {user.email}
                        </div>
                    </div>
                    <div className={"text-center col d-flex justify-content-center " + styles.description_inner}>
                        <a className={styles.des_social} href={user.socialMedia?.facebook ? user.socialMedia.facebook : "#"} style={{ backgroundColor: '#3763d2' }}>
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a className={styles.des_social} href={user.socialMedia?.instagram ? user.socialMedia.instagram : "#"} style={{ backgroundColor: '#f8468d' }}>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className={styles.des_social} href={user.socialMedia?.youtube ? user.socialMedia.youtube : "#"} style={{ backgroundColor: '#fd434f' }}>
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <Navigation />
        </div>
    )
}