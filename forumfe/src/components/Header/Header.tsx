import { FC, useContext } from "react";
import styles from "./Header.module.css";
import Logo from "../../images/logo.png";
import Avatar from "../../images/avatar/01.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { Logout } from "../auth/Logout/Logout";

const Header: FC<{}> = () => {
  let navigate = useNavigate();

  const context = useContext(UserContext)
  const user = context.user

  const _clickLogin = () => {
    navigate('/login');
  }
  return (
    <div className={styles.header}>
      <div className={styles.header_actions}>
        <div className={styles.header_brand}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" />
          </div>

          <p className={styles.header_brand_text}>Vikinger4</p>
        </div>
      </div>

      <div className={styles.header_actions}>
        <nav className={styles.navigation}>
          <ul className={styles.menu_main}>
            <li className="menu-main-item">
              <a className={styles.menu_main_item_link} href="#">
                Home
              </a>
            </li>
            <li className="menu-main-item">
              <a className={styles.menu_main_item_link} href="#">
                Features
              </a>
            </li>
            <li className="menu-main-item">
              <a className={styles.menu_main_item_link} href="#">
                Faqs
              </a>
            </li>
            <li className="menu-main-item">
              <a className={styles.menu_main_item_link} href="#">
                ...
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${styles.header_actions} ${styles.search_bar}`}>
        <div className={styles.interactive_input}>
          <input
            type="text"
            name="search_main"
            placeholder="Search here for people or posts"
          />
          <div className={styles.interactive_input_icon_wrap}>
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>

      <div className={`${styles.header_actions} ${styles.header_actions_list}`}>
        {/* Notification */}
        <div className={styles.notifications}>
          <i className="far fa-bell"></i>
          <span>.</span>
        </div>

        {/* Setting */}
        <div className={styles.settings}>
          <i className="fas fa-cog"></i>
          <div>
            <ul>
              <li>
                <div className={styles.settings_header}>
                  <img src={Avatar} alt="avatar" />
                  <p>
                    Hi Marina!
                  </p>
                </div>
                <hr />
              </li>
              <li>
                <NavLink to="/profile">Profile Info</NavLink>
              </li>
              <li>
                <NavLink to="/profile/settings/password">Change password</NavLink>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </div>
        </div>

        {/* Login */}
        {
          localStorage.getItem('user') ? 
          <img className="rounded-circle mr-2" width={50} height={50} src={user && user.avatar} alt="avatar" />
          : 
          (<div className={styles.login}>
            <button onClick={_clickLogin}>Login</button>
          </div>)
        }
      </div>
    </div>
  );
};

export default Header;