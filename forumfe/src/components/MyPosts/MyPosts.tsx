import { FC, useContext, useEffect, useState } from "react";
import styles from "./MyPosts.module.css";
import Banner from "../../images/banners/banner.png";
import MyPost from "../../images/banners/myposts.png";
import MyPostItem from "./MyPostItem/MyPostItem";
import MyPostPagination from "./MyPostPagination/MyPostPagination";
import { PostContext } from "../../context/PostContext";
import { getPosts } from "../../apis/posts-apis";
import moment from "moment";
import { AuthGuard } from "../auth/guard/AuthGuard";

const MyPosts: FC<{}> = () => {
  const postContext = useContext(PostContext);
  const [form, setForm] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [choice, setChoice] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form !== "") {
      const postList = posts.filter((item: Post) => {
        if (item.title.toLowerCase().includes(form.toLowerCase())) return item;
        return 0;
      });
      postContext.setPosts([...postList]);
      setPosts([...postList]);
    } else {
      getPosts()
        .then((data) => {
          setPosts(data);
          postContext.setPosts(data);
        })
        .catch((err: Error) => console.log(err));
    }

  };

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
        postContext.setPosts(data);
      })
      .catch((err: Error) => console.log(err));
  }, []);

  useEffect(() => {
    const amount = 5;
    const postList = [...posts].reverse().filter((item: Post, index: number) => {
      if (
        index >= amount * (currentPage - 1) &&
        index <= amount * currentPage - 1
      )
        return item;
      return 0;
    });
    setCurrentPosts([...postList]);
  }, [postContext.posts, currentPage]);

  useEffect(() => {
    switch (choice) {
      case 0:
        const postList0 = posts.sort(
          (a: { title: string }, b: { title: string }) => {
            if (a.title > b.title) return 1;
            else if (a.title < b.title) return -1;
            else return 0;
          }
        );
        postContext.setPosts([...postList0]);
        // setPosts([...postList0]);
        break;
      case 1:
        const postList1 = posts.sort(
          (a: { title: string }, b: { title: string }) => {
            if (a.title < b.title) return 1;
            else if (a.title > b.title) return -1;
            else return 0;
          }
        );
        postContext.setPosts([...postList1]);
        // setPosts([...postList1]);
        break;
      case 2:
        const postList2 = posts.sort(
          (a: { createdAt: string }, b: { createdAt: string }) => {
            if (moment(a.createdAt).isBefore(b.createdAt)) return 1;
            else if (moment(a.createdAt).isAfter(b.createdAt)) return -1;
            else return 0;
          }
        );
        postContext.setPosts([...postList2]);
        // setPosts([...postList2]);
        break;
      case 3:
        const postList3 = posts.sort(
          (a: { createdAt: string }, b: { createdAt: string }) => {
            if (moment(a.createdAt).isAfter(b.createdAt)) return 1;
            else if (moment(a.createdAt).isBefore(b.createdAt)) return -1;
            else return 0;
          }
        );
        postContext.setPosts([...postList3]);
        // setPosts([...postList3]);
        break;
      default:
        break;
    }
  }, [choice]);

  return (
    <AuthGuard moveTo='/login'>
      <div className={styles.myposts}>
        <img src={Banner} alt="banner" />
        <img src={MyPost} alt="myposts" />
        <p>My Posts</p>
        <div className={styles.management}>
          <select onChange={(e) => setChoice(Number(e.target.value))}>
            <option hidden>Order By</option>
            <option value={0}>Title Descending</option>
            <option value={1}>Title Ascending</option>
            <option value={2}>Date Descending</option>
            <option value={3}>Date Ascending</option>
          </select>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search posts by title"
              value={form}
              onChange={(e) => setForm(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className={styles.myposts_title}>
          <div>MY POSTS</div>
          <div>LIKES</div>
          <div>COMMENTS</div>
          <div>TAGS</div>
          <div>Actions</div>
        </div>
        <div className={styles.myposts_list}>
          {currentPosts && currentPosts.length > 0 ? (
            [...currentPosts].map((item: Post) => {
              return <MyPostItem key={item.id} post={item} />;
            })
          ) : (
            <></>
          )}
        </div>
        <MyPostPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </AuthGuard>
  );
};

export default MyPosts;
