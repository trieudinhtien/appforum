import { createContext, useState, ReactElement } from "react";

interface Context {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostContext = createContext<Context>({
  posts: [
    {
      id: 0,
      author: {
        author_id: 0,
        author_name: "",
        author_img: "",
      },
      createdAt: "",
      likes: [{ id: 0, user_id: 0, createdAt: "" }],
      comments: [
        {
          id: 0,
          user_id: 0,
          comment: "",
          createdAt: "",
          user_name: "",
          user_img: "",
        },
      ],
      tags: [],
      img: "",
      content: "",
      title: "",
    },
  ],
  setPosts: () => {},
});

function PostContextProvider({ children }: { children: ReactElement }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 0,
      author: {
        author_id: 0,
        author_name: "",
        author_img: "",
      },
      createdAt: "",
      likes: [{ id: 0, user_id: 0, createdAt: "" }],
      comments: [
        {
          id: 0,
          user_id: 0,
          comment: "",
          createdAt: "",
          user_name: "",
          user_img: "",
        },
      ],
      tags: [],
      img: "",
      content: "",
      title: "",
    },
  ]);

  const value = {
    posts: posts,
    setPosts: setPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export { PostContext, PostContextProvider };
