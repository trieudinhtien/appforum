/// <reference types="react-scripts" />
interface Post {
  id: number;
  user_id: number;
  title: string;
  createdAt: string;
  likes: { id: number; user_id: number; createdAt: string }[];
  comments: {
    id: number;
    user_id: number;
    comment: string;
    createdAt: string;
  }[];
  tags: string[];
  img: string;
  content: string;
}

interface CreatePostForm {
  title: string;
  tags: string;
}

interface ErrorCreatePostForm extends CreatePostForm {
  editor: string;
}

interface Notificationn {
  id: number;
  type: string;
  user_id: number;
  createdAt: string;
}

interface User {
  [key: string]: string | undefined | number | null | Object;
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  cover: string;
  avatar: string;
  gender: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  followings_id: number[];
  introduce: string;
  phone: string;
  birthday: string;
  address: string;
  status: boolean;
  createdAt: number;
  modifiedAt: number;
  token: string;
}

interface Following {
  [key: string]: string | undefined | number | null | Object;
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  avatar: string;
  cover: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  introduce: string;
}
