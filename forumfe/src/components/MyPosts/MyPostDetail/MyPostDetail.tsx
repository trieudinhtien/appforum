import { FC, useEffect } from "react";
import styles from "./MyPostDetail.module.css";
import Banner from "../../../images/banners/banner.png";
import Detail from "../../../images/banners/mypost_detail.png";
import Footer from "../../Footer/Footer";
import Navigation from "../../Navigation/Navigation";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../apis/posts-apis";

const MyPostDetail: FC<{}> = () => {
  const params = useParams();
  useEffect(() => {
    if(params.id){
      getPostById(Number(params.id))
      .then(data => console.log(data))
      .catch((err: Error) => console.log(err));
    }
  }, []);
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
