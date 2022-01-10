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
              <p>BuddyPress Social Community</p>
            </div>
          </div>

          <div className={styles.footer_left_content}>
            Vikinger Social Community was created in 2020, designed to be a new
            and exciting way to bring people together!
          </div>

          <div className={styles.footer_left_bottom}>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        <div className={styles.footer_item}>
            <p>BuddyPress</p>
            <ul>
                <li>Profile Timeline</li>
                <li>Profile About</li>
                <li>Profile Friends</li>
                <li>Profile Groups</li>
                <li>Profile Blog Posts</li>
                <li>Profile Photos</li>
                <li>Activity</li>
                <li>Members</li>
                <li>Groups</li>
            </ul>
        </div>

        <div className={styles.footer_item}>
            <p>GamiPress</p>
            <ul>
                <li>Badges</li>
                <li>Profile Badges</li>
                <li>Quests</li>
                <li>Profile Quests</li>
                <li>Ranks</li>
                <li>Profile Rank</li>
                <li>Credits</li>
                <li>Profile Credits</li>
            </ul>
        </div>

        <div className={styles.footer_item}>
            <p>bbPress</p>
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
