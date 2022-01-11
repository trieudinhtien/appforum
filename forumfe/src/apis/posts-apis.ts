import axios, { AxiosResponse } from "axios";
import { Post } from "../react-app-env";

export const createPost = (token:string, post: Post): Promise<Post> => {
    return axios({
        method: "POST",
        url: "http://localhost:3000/createpost",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then((res: AxiosResponse<Post>) => res.data)
}