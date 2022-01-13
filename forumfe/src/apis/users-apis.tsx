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

export function changeUserById(id: number, token: string, firstName: string, lastName: string, birthday: string, gender: string, phone: string, address: string, introduce: string) {
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
            "introduce": introduce
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

