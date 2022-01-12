import axios from 'axios'

export function getPost() {
    return axios({
        method: "GET",
        url: `http://localhost:3000/posts/`
    }).then(res => res.data)
        .catch(err => console.error(err))
}
export function getPostById(id: number) {
    return axios({
        method: "GET",
        url: `http://localhost:3000/posts/${id}`,
    
    }).then(res => res.data)
        .catch(err => console.error(err))
}