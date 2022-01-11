// import { createContext, useState, ReactElement } from "react";
// import { Post } from "../react-app-env";

// interface Context {
//     posts: Post[],
//     setPosts: React.Dispatch<React.SetStateAction<Post[]>>
// }

// const PostContext = createContext<Context>({ posts: [{
//     id: 0,
//     user_id: 0,
//     title: "",
//     createdAt: "",
//     likes: "",
//     comments: {
//         id: 0,
//         user_id: 0,
//         comment: "",
//         createdAt: "",
//     }[],
//     tags: [],
//     img: "",
//     content: "",]
// }, setPosts: () => { } })

// function PostContextProvider({ children }: { children: ReactElement }) {

//     const [posts, setPosts] = useState({
//         id: 0,
//     user_id: 0,
//     title: "",
//     createdAt: "",
//     likes: "",
//     comments: {
//         id: 0,
//         user_id: 0,
//         comment: "",
//         createdAt: "",
//     }[],
//     tags: [],
//     img: "",
//     content: "",
//     })

//     const value = {
//         posts: posts,
//         setPosts: setPosts
//     }

//     return (
//         <PostContext.Provider value={value}>
//             {children}
//         </PostContext.Provider>
//     )

// }

// export { PostContext, PostContextProvider }

export const a = () => {
    
}