/// <reference types="react-scripts" />

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

