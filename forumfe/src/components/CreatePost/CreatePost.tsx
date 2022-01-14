import { FC, useContext, useEffect, useState } from "react";
import styles from "./CreatePost.module.css";
import Banner from "../../images/banners/banner.png";
import NewPost from "../../images/banners/newpost.png";
import { useNavigate } from "react-router-dom";
import { AuthGuard } from "../auth/guard/AuthGuard";
import { createPost, getPosts } from "../../apis/posts-apis";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const CreatePost: FC<{}> = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
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

  const [posts, setPosts] = useState<Post[]>();

  const checkTitle = (title: string): boolean => {
    let check: boolean = false;
    posts?.forEach((item: Post) => {
      if (title === item.title) check = true;
    });
    return check;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      title: "",
      content: "",
      tags: "",
    };
    if (form.title === "") obj.title = "Title required!";
    if (form.content === "") obj.content = "Your post required!";
    if (form.tags === "") obj.tags = "Tags required!";
    setError(obj);

    if (obj.title === "" && obj.content === "" && obj.tags === "") {
      if (checkTitle(form.title)) {
        alert("Title has existed! Try again!");
      } else if (userContext.user.token && !checkTitle(form.title))
        createPost(userContext.user.token, {
          id: Date.now(),
          user_id: Date.now(),
          title: form.title,
          createdAt: moment().format(),
          likes: 7,
          comments: [],
          tags: form.tags.split(" "),
          img: "",
          content: form.content,
        })
          .then((data) => {
            postContext.setPosts([...postContext.posts, data]);
            setForm({
              title: "",
              content: "",
              tags: "",
            });
            navigate("/myposts");
          })
          .catch((error: Error) => console.log(error));
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

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <AuthGuard moveTo='/login'>
      <Navigation />
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
              placeholder={`Enter your tags (Split by " ")`}
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
      <Footer />
    </AuthGuard>
  );
};

export default CreatePost;
