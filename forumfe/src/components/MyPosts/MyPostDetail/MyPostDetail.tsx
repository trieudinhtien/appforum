import { FC } from "react";
import styles from "./MyPostDetail.module.css";
import Banner from "../../../images/banners/banner.png";
import Detail from "../../../images/banners/mypost_detail.png";

const MyPostDetail: FC<{}> = () => {
  return (
    <div className={styles.detail}>
      <img src={Banner} alt="banner" />
      <img src={Detail} alt="newpost" />
      <p>Create New Post</p>
    </div>
  );
};

export default MyPostDetail;
