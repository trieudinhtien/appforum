import { FC } from "react";
import styles from "./MyPosts.module.css";
import Banner from "../../images/banners/banner.png";
import MyPost from "../../images/banners/myposts.png";
import MyPostItem from "./MyPostItem/MyPostItem";
import MyPostPagination from "./MyPostPagination/MyPostPagination";
import { AuthGuard } from "../auth/guard/AuthGuard";

const MyPosts: FC<{}> = () => {

  return (
    <AuthGuard moveTo='/login'>
      <div className={styles.myposts}>
        <img src={Banner} alt="banner" />
        <img src={MyPost} alt="myposts" />
        <p>My Posts</p>
        <div className={styles.myposts_title}>
          <div>MY POSTS</div>
          <div>LIKES</div>
          <div>COMMENTS</div>
          <div>TAGS</div>
        </div>
        <div className={styles.myposts_list}>
          <MyPostItem />
          <MyPostItem />
        </div>
        <MyPostPagination />
      </div>
    </AuthGuard>
  );
};

export default MyPosts;
