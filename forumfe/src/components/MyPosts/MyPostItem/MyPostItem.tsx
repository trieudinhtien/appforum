import moment from "moment";
import { FC, useContext } from "react";
import { deletePost } from "../../../apis/posts-apis";
import { PostContext } from "../../../context/PostContext";
import { UserContext } from "../../../context/UserContext";
import styles from "./MyPostItem.module.css";
import { useNavigate } from "react-router-dom";

const MyPostItem: FC<{ post: Post }> = ({ post }) => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (userContext.user.token) {
      const check = window.confirm(
        "Are you sure you want to remove this post?"
      );
      if (check) {
        await deletePost(userContext.user.token, post.id)
          .then((data) => {console.log("Deleted post successfully!")})
          .catch((err: Error) => console.log(err));

        const postList = postContext.posts.filter((item: Post) => {
          if (item.id !== post.id) return item;
          return;
        });
        postContext.setPosts([...postList]);
      }
    }
  };

  return (
    <div className={styles.mypost_item}>
      <div>
        <div className={styles.mypost_item_title} onClick={() => navigate(`/myposts/${post.id}`)}>{post.title}</div>
        <div className={styles.mypost_item_user}>
          Created {moment(post.createdAt).fromNow()}
        </div>
      </div>
      <div>{post.likes}</div>
      <div>{post.comments.length}</div>
      <div>{post.tags.join(", ")}</div>
      <div className={styles.actions}>
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MyPostItem;
