import { FC, useContext, useEffect, useState } from "react";
import styles from "./CreatePost.module.css";
import Banner from "../../images/banners/banner.png";
import NewPost from "../../images/banners/newpost.png";
import { useNavigate } from "react-router-dom";
import { AuthGuard } from "../auth/guard/AuthGuard";
import {
  createPost,
  editPost,
  getPostById,
} from "../../apis/posts-apis";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import JoditEditor from "jodit-react";
import { useParams } from "react-router-dom";

const CreatePost: FC<{}> = () => {
  const navigate = useNavigate();
  const [editor, setEditor] = useState<string>("");
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);
  const params = useParams();

  const [form, setForm] = useState<CreatePostForm>({
    title: "",
    tags: "",
  });

  const [error, setError] = useState<ErrorCreatePostForm>({
    title: "",
    tags: "",
    editor: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj = {
      title: "",
      tags: "",
      editor: "",
    };
    if (form.title === "") obj.title = "Title required!";
    if (form.tags === "") obj.tags = "Tags required!";
    if (editor === "") obj.editor = "Your post required!";
    setError(obj);

    if (obj.title === "" && obj.editor === "" && obj.tags === "") {
      if (userContext.user.token) {
        if (params.id) {
          editPost(userContext.user.token, Number(params.id), {
            title: form.title,
            content: editor,
            tags: form.tags.trim().split(" "),
          })
            .then((data) => {
              const postList = postContext.posts.map((item: Post) => {
                if (item.id === Number(params.id)) {
                  return {
                    id: item.id,
                    author: item.author,
                    title: form.title,
                    createdAt: item.createdAt,
                    likes: item.likes,
                    comments: item.comments,
                    tags: form.tags.trim().split(" "),
                    img: item.img,
                    content: editor,
                  };
                }
                return item;
              });
              postContext.setPosts(postList);
              setForm({
                title: "",
                tags: "",
              });
              setEditor("");
              navigate("/myposts");
            })
            .catch((err: Error) => console.log(err));
        } else {
          createPost(userContext.user.token, {
            id: Date.now(),
            author: {
              author_id: userContext.user.id,
              author_name: userContext.user.username,
              author_img: userContext.user.avatar,
            },
            title: form.title,
            createdAt: moment().format(),
            likes: [],
            comments: [],
            tags: form.tags.trim().split(" "),
            img: "",
            content: editor,
          })
            .then((data) => {
              postContext.setPosts([...postContext.posts, data]);
              setForm({
                title: "",
                tags: "",
              });
              setEditor("");
              navigate("/myposts");
            })
            .catch((error: Error) => console.log(error));
        }
      }
    }
  };

  const handleCancel = (): void => {
    setForm({
      title: "",
      tags: "",
    });
    setEditor("");
    navigate(-1);
  };

  // useEffect(() => {
  //   getPosts()
  //     .then((data) => {
  //       const newData = data.filter((item: Post) => {
  //         if (item.user_id === userContext.user.id) return item;
  //         return 0;
  //       });
  //       postContext.setPosts(newData);
  //     })
  //     .catch((err: Error) => console.log(err));
  // }, []);

  useEffect(() => {
    if (params.id) {
      getPostById(Number(params.id))
        .then((data) => {
          setEditor(data.content);
          setForm({
            title: data.title,
            tags: data.tags.join(" "),
          });
        })
        .catch((err: Error) => console.log(err));
    } else {
      setEditor("");
      setForm({
        title: "",
        tags: "",
      });
    }
  }, [params.id]);

  return (
    <AuthGuard moveTo="/login">
      <div className={styles.create_post}>
        <img src={Banner} alt="banner" />
        <img src={NewPost} alt="newpost" />
        <p>{params.id ? "Edit your post" : "Create New Post"}</p>

        <form className={styles.create_post_form} onSubmit={handleSubmit}>
          <p>{params.id ? "Your post" : "New Post"}</p>
          <div className={styles.form_group}>
            <label>Post Title</label>
            <input
              type="text"
              placeholder="Enter your title"
              name="title"
              value={form.title}
              maxLength={60}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {error.title && (
              <label className={styles.error}>{error.title}</label>
            )}
          </div>
          <div className={styles.form_group}>
            <label>Your post</label>
            {/* <textarea
              placeholder={`Enter your post`}
              name="content"
              value={form.content}
              maxLength={100}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            /> */}
            <JoditEditor
              value={editor}
              onBlur={(newContent) => {
                setEditor(newContent);
              }}
              onChange={(newContent) => {
                setEditor(newContent);
              }}
            />
            {error.editor && (
              <label className={styles.error}>{error.editor}</label>
            )}
          </div>
          <div className={styles.form_group}>
            <label>Tags</label>
            <input
              type="text"
              placeholder={`Enter your tags (Split by " ")`}
              name="tags"
              value={form.tags}
              maxLength={20}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
            {error.tags && <label className={styles.error}>{error.tags}</label>}
          </div>
          <div className={styles.submit_group}>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">{params.id ? "Save" : "Create"}</button>
          </div>
        </form>
      </div>
    </AuthGuard>
  );
};

export default CreatePost;
