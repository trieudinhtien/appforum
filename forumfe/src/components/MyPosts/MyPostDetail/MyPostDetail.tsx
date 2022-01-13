import { FC, useEffect } from "react";
import styles from "./MyPostDetail.module.css";
import Banner from "../../../images/banners/banner.png";
import Detail from "../../../images/banners/mypost_detail.png";
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
    <div className={styles.detail}>
      <img src={Banner} alt="banner" />
      <img src={Detail} alt="newpost" />
      <p>Details</p>

      <div>asd</div>
    </div>
  ); 
};

export default MyPostDetail;
