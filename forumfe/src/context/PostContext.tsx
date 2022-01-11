import { createContext, useState, ReactElement } from "react";

interface Context {
    post: Post,
    setPost: React.Dispatch<React.SetStateAction<Post>>
}

const PostContext = createContext<Context>({
    post: {
        "id": 0,
        "user_id": 0,
        "createdAt": "",
        "likes": 1,
        "comments": [] as {
            id: number,
            user_id: number,
            comment: string,
            createdAt: string,
        }[],
        "tags": [] as string[],
        "img": "string" ,
        "content": "string",
        "title":""
    }, setPost: () => { }
})

function PostContextProvider({ children }: { children: ReactElement }) {

    const [post, setPost] = useState({
        "id": 0,
        "user_id": 0,
        "createdAt": "",
        "likes": 1,
        "comments": [] as {
            id: number,
            user_id: number,
            comment: string,
            createdAt: string,
        }[],
        "tags": [] as string[],
        "img": "string",
        "content": "string",
        "title":""

    })

    const value = {
        post: post,
        setPost: setPost
    }

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )

}

export { PostContext, PostContextProvider }
