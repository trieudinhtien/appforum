import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../../context/UserContext'
import styles from './About.module.css'
import { getPosts } from '../../../../../apis/posts-apis'

export default function About() {

    const context = useContext(UserContext)
    const user = context.user
    const [postLiked, setPostLiked] = useState([] as Post[])

    useEffect(() => {
        getPosts()
            .then((posts: Post[]) => {
                const liked = [] as Post[]
                posts.forEach((post: Post) => {
                    for (const like of post.likes) {
                        if (like.user_id === user.id) {
                            liked.push(post)
                            break;
                        }
                    }
                })
                setPostLiked(liked)
            })
    }, [])

    return (
        <div className={styles.outer + " d-flex justify-content-between"}>
            <div className={styles.main_left}>
                <h3>About Me</h3>
                <p className={styles.introduce}>{user.introduce}</p>
            </div>
            <div className={styles.main_center}>
                <h3>You liked those posts :</h3>
                <ul>
                    {
                        postLiked.length > 0 ?
                            postLiked.map(post => (
                                <li key={post.id}>{post.title}</li>
                            ))
                        : <li>You not like any post before</li>
                    }
                </ul>
            </div>
            <div className={styles.main_right}>
                <h3>Personal Info</h3>
                <div className="d-flex flex-wrap">
                    <p className="col-4 text-muted">Email</p>
                    <p className="col-8">{user.email}</p>
                    <p className="col-4 text-muted">Birthday</p>
                    <p className="col-8">{moment(user.birthday).format('LL')}</p>
                    <p className="col-4 text-muted">Phone</p>
                    <p className="col-8">{user.phone}</p>
                    <p className="col-4 text-muted">Address</p>
                    <p className="col-8">{user.address}</p>
                </div>
            </div>
        </div>
    )
}