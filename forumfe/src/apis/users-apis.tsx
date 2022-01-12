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

export function login() {
    return axios({
        method: "POST",
        url: `http://localhost:3000/login`,
        data: { "email": "admin@gmail.com", "password": "123" }
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