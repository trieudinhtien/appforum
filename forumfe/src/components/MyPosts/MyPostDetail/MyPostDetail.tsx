import { FC } from "react";
import styles from "./MyPostDetail.module.css";
import Banner from "../../../images/banners/banner.png";
import Detail from "../../../images/banners/mypost_detail.png";
import Footer from "../../Footer/Footer";
import Navigation from "../../Navigation/Navigation";

const MyPostDetail: FC<{}> = () => {
  return (
    <>
    <Navigation />
      <div className={styles.detail}>
        <img src={Banner} alt="banner" />
        <img src={Detail} alt="newpost" />
        <p>Create New Post</p>
      </div>
      <Footer />
    </>
  );
};

export default MyPostDetail;
