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

export const getPostById = (id: number): Promise<Post> => {
  return axios({
    method: "GET",
    url: `http://localhost:3000/posts/${id}`,
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  }).then((res: AxiosResponse<Post>) => res.data);
}

export const editPost = (token: string, id: number, post: { title: string, content: string, tags: string[] }): Promise<Post> => {
  return axios({
    method: "PATCH",
    url: `http://localhost:3000/posts/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      title: post.title,
      content: post.content,
      tags: post.tags,
    }
  }).then((res: AxiosResponse<Post>) => res.data);
};

export const deletePost = (token: string, id: number): Promise<Post> => {
  return axios({
    method: "DELETE",
    url: `http://localhost:3000/posts/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res: AxiosResponse<Post>) => res.data);
};
export function sendComment(id: number, token: string, post: Post) {
  return axios({
    method: "PATCH",
    url: `http://localhost:3000/posts/${id}`,
    headers: {
      authorization: `Bearer ${token}`
    },
    data: post

  }).then(res => res.data)
    .catch(err => console.log(err))
}

export function sendLike(id: number, token: string, post: Post) {
  return axios({
    method: "PATCH",
    url: `http://localhost:3000/posts/${id}`,
    headers: {
      authorization: `Bearer ${token}`
    },
    data: post
  }).then(res => res.data)
    .catch(err => console.log(err))
}