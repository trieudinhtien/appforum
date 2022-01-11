import { FC, useState } from "react";
import styles from "./CreatePost.module.css";
import Banner from "../../images/banners/banner.png";
import NewPost from "../../images/banners/newpost.png";
import { CreatePostForm } from "../../react-app-env";
import { useNavigate } from "react-router-dom";

const CreatePost: FC<{}> = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreatePostForm>({
    title: "",
    content: "",
    tags: "",
  });

  const [error, setError] = useState<CreatePostForm>({
    title: "",
    content: "",
    tags: "",
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      title: "",
      content: "",
      tags: "",
    };
    if (!form.title) obj.title = "Title required!";
    if (!form.content) obj.content = "Your post required!";
    if (!form.tags) obj.tags = "Tags required!";
    setError(obj);

    if (error.title && error.content && error.tags) {
      console.log("success");
    }
  };

  const handleCancel = (): void => {
    setForm({
      title: "",
      content: "",
      tags: "",
    });
    navigate(-1);
  };

  return (
    <div className={styles.create_post}>
      <img src={Banner} alt="banner" />
      <img src={NewPost} alt="newpost" />
      <p>Create New Post</p>

      <form className={styles.create_post_form} onSubmit={handleSubmit}>
        <p>New Post</p>
        <div className={styles.form_group}>
          <label>Post Title</label>
          <input
            type="text"
            placeholder="Enter your title"
            name=""
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {error.title && <label className={styles.error}>{error.title}</label>}
        </div>
        <div className={styles.form_group}>
          <label>Your post</label>
          <input
            type="text"
            placeholder="Enter your post"
            name=""
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          {error.content && (
            <label className={styles.error}>{error.content}</label>
          )}
        </div>
        <div className={styles.form_group}>
          <label>Tags</label>
          <input
            type="text"
            placeholder="Enter your tags"
            name=""
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          {error.tags && <label className={styles.error}>{error.tags}</label>}
        </div>
        <div className={styles.submit_group}>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
