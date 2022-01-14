/// <reference types="react-scripts" />
interface Post {
    id: number;
    author: {
        author_id: number,
        author_name: string,
        author_img: string,
    }
    title: string;
    createdAt: string;
    likes: Like[];
    comments: Comment[];
    tags: string[];
    img: string;
    content: string;
}

interface CreatePostForm {
    title: string,
    tags: string
}

interface ErrorCreatePostForm extends CreatePostForm {
    editor: string,
}

interface User {
    [key: string]: string | undefined | number | null | Object,
    "id": number,
    "firstName": string,
    "lastName": string,
    "username": string,
    "email": string,
    "password": string,
    "cover": string,
    "avatar": string,
    "gender": string,
    "socialMedia": {
        "facebook": string,
        "instagram": string,
        "youtube": string
    },
    "followings_id": number[],
    "introduce": string,
    "phone": string,
    "birthday": string,
    "address": string,
    "status": boolean,
    "createdAt": number,
    "modifiedAt": number,
    "token": string
}

interface Following {
    [key: string]: string | undefined | number | null | Object,
    "id": number,
    "firstName": string,
    "lastName": string,
    "gender": string,
    "email": string,
    "avatar": string,
    "cover": string,
    "socialMedia": {
        "facebook": string,
        "instagram": string,
        "youtube": string
    },
    "introduce": string
}

interface Comment {

    id: number;
    user_id: number;
    comment: string;
    createdAt: string;
    user_name: string,
    user_img: string,

}
interface Like {
    id: number; 
    user_id: number; 
    createdAt: string;
}