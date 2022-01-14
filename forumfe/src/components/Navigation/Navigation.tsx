import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation: FC<{}> = () => {
  return (
    <div className={styles.navigation}>
      <ul className={styles.navigation_list}>
        <li>
          <NavLink
            title="Profile"
            style={({ isActive }) => {
              return {
                color: isActive ? "#fff" : "",
                backgroundColor: isActive ? "#23d2e2" : "",
                boxShadow: isActive
                  ? "4px 7px 12px 0 rgba(35, 210, 226, 0.2)"
                  : "",
              };
            }}
            to={`/profile`}
          >
            <i className="far fa-user"></i>
          </NavLink>
        </li>

        <li>
          <NavLink
            title="Create Post"
            style={({ isActive }) => {
              return {
                color: isActive ? "#fff" : "",
                backgroundColor: isActive ? "#23d2e2" : "",
                boxShadow: isActive
                  ? "4px 7px 12px 0 rgba(35, 210, 226, 0.2)"
                  : "",
              };
            }}
            to={`/createpost`}
          >
            {/* <i className="far fa-address-card"></i> */}
            <i className="fas fa-plus-square"></i>
          </NavLink>
        </li>

        <li>
          <NavLink
            title="My Posts"
            style={({ isActive }) => {
              return {
                color: isActive ? "#fff" : "",
                backgroundColor: isActive ? "#23d2e2" : "",
                boxShadow: isActive
                  ? "4px 7px 12px 0 rgba(35, 210, 226, 0.2)"
                  : "",
              };
            }}
            to={`/myposts`}
          >
            {/* <i className="fas fa-copy"></i> */}
            <i className="far fa-address-card"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  
  );
};

export default Navigation;
