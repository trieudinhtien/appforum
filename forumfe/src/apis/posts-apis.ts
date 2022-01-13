import axios, { AxiosResponse } from "axios";

export const createPost = (token: string, post: Post): Promise<Post> => {
  return axios({
    method: "POST",
    url: "http://localhost:3000/posts",
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: post,
  }).then((res: AxiosResponse<Post>) => res.data);
};

export const getPosts = (): Promise<Post[]> => {
  return axios
    .get("http://localhost:3000/posts")
    .then((res: AxiosResponse<Post[]>) => res.data);
};

export const getPostById = (id: number): Promise<Post> =>{
  return axios({
    method: "GET",
    url: `http://localhost:3000/posts/${id}`,
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  }).then((res: AxiosResponse<Post>) => res.data);
}

export const deletePost = (token: string, id: number): Promise<Post> => {
  return axios({
    method: "DELETE",
    url: `http://localhost:3000/posts/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res: AxiosResponse<Post>) => res.data);
};
