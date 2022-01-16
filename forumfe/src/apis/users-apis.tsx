import axios from 'axios'

export function getUserById(id: number, token: string) {
    return axios({
        method: "GET",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res => res.data)
        .catch(err => console.error(err))
}

export function getAllUser(token: string) {
    return axios({
        method: "GET",
        url: `http://localhost:3000/users`,
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res => res.data)
        .catch(err => console.error(err))
}

export function login(data: any) {
    return axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: data
    }).then(res => res.data)
        .catch(err => console.error(err))
}

export function changePasswordById(id: number, token: string, password: string) {
    return axios({
        method: "PATCH",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            "password": password
        }
    }).then(res => res.data)
        .catch(err => console.log(err))
}

export function changeUserById(id: number, token: string, firstName: string, lastName: string, birthday: string, gender: string, phone: string, address: string, introduce: string, facebook: string, instagram: string, youtube: string) {
    return axios({
        method: "PATCH",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            "firstName": firstName,
            "lastName": lastName,
            "birthday": birthday,
            "gender": gender,
            "phone": phone,
            "address": address,
            "introduce": introduce,
            "socialMedia": {
                "facebook": facebook,
                "instagram": instagram,
                "youtube": youtube
            }
        }
    }).then(res => res.data)
        .catch(err => console.log(err))
}

export function changeFollowings(id: number, token: string, followingsID: number[]) {
    return axios({
        method: "PATCH",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            "followings_id": followingsID
        }
    }).then(res => res.data)
        .catch(err => console.log(err))
}

export function saveImg(data: FormData) {
    return axios({
        method: "POST",
        url: "http://localhost:3000/upload-file",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    }).then(res => res.data)
        .catch(err => err.data)
}

export function changeAvatar(id: number, token: string, avatar: string) {
    return axios({
        method: "PATCH",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            avatar: avatar
        }
    }).then(res => res.data)
        .catch(err => err.data)
}

export function changeCover(id: number, token: string, cover: string) {
    return axios({
        method: "PATCH",
        url: `http://localhost:3000/users/${id}`,
        headers: {
            authorization: `Bearer ${token}`
        },
        data: {
            cover: cover
        }
    }).then(res => res.data)
        .catch(err => err.data)
}

