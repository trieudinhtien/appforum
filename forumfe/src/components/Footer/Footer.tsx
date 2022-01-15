import { FC } from "react";
import styles from "./Footer.module.css";
import Logo from "../../images/logo.png";

const Footer: FC<{}> = () => {
  return (
    <div className={styles.footer}>
      <div className={`${styles.content_grid}`}>
        <div className={styles.footer_left}>
          <div className={styles.footer_left_top}>
            <img src={Logo} alt="logo" />
            <div>
              <div>VIKINGER4</div>
              <p>VIKINGER4 Social Community</p>
            </div>
          </div>

          <div className={styles.footer_left_content}>
            Vikinger4 Forum was created in 2022, by 4 people: Dat, Toan, Minh,
            Tien, designed to be a new and exciting way to bring people
            together!
          </div>

          <div className={styles.footer_left_bottom}>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        <div className={styles.footer_item}>
          <p>Vikinger4.vn</p>
          <ul>
            <li>Forum</li>
            <li>Support</li>
            <li>Guide</li>
            <li>Event</li>
            <li>Contact</li>
            <li>Reference</li>
            <li>Activity</li>
          </ul>
        </div>

        <div className={styles.footer_item}>
          <p>Forum</p>
          <ul>
            <li>Information</li>
            <li>Computer</li>
            <li>Mobile</li>
            <li>Camera</li>
          </ul>
        </div>

        <div className={styles.footer_item}>
          <p>Links</p>
          <ul>
            <li>Forums</li>
            <li>SubForums</li>
            <li>Open Topic</li>
            <li>Profile Forum Activity</li>
            <li>Profile Forum Replies</li>
            <li>Profile Forum Engagement</li>
            <li>Profile Forum Favorites</li>
          </ul>
        </div>

        <div className={styles.footer_item}>
          <p>More Links</p>
          <ul>
            <li>Group Timeline</li>
            <li>Group Members</li>
            <li>Group Photos</li>
            <li>Landing</li>
            <li>Blog</li>
            <li>Private Group</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
