/// <reference types="react-scripts" />
interface Post{
    id: number,
    user_id: number,
    title: string,
    createdAt: string,
    likes: number,
    comments: {
        id: number,
        user_id: number,
        comment: string,
        createdAt: string,
    }[],
    tags: string[],
    img: string,
    content: string,
}

interface CreatePostForm{
    title: string,
    content: string,
    tags: string
}


interface User {
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
    "phone": string,
    "birthday": string,
    "address": string,
    "status": boolean,
    "createdAt": number,
    "modifiedAt": number,
    "token": string
}