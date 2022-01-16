import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../../context/UserContext'
import styles from './About.module.css'
import { getPosts } from '../../../../../apis/posts-apis'
import { Link } from 'react-router-dom'

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
            <div>
                <div className={styles.main_left}>
                    <h3 style={{ color: '#615dfa' }}>About Me</h3>
                    {
                        user.introduce ?
                            <p className={styles.introduce}>{user.introduce}</p>
                            : <p className={styles.introduce}>You're missing some information, add
                                <Link to='/profile/settings/profile' style={{ color: '#605cf8' }}>&nbsp;here</Link>
                            </p>
                    }
                </div>
            </div>
            <div className={styles.main_center}>
                <h3 style={{ color: '#615dfa' }}>You liked those posts :</h3>
                <ul>
                    {
                        postLiked.length > 0 ?
                            postLiked.map(post => (
                                <li key={post.id}>
                                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                                    <p>
                                        {
                                            // post.
                                        }
                                    </p>
                                </li>
                            ))
                            : <li>You not like any post before</li>
                    }
                </ul>
            </div>
            <div>
                <div className={styles.main_right}>
                    <h3 style={{ color: '#615dfa' }}>Personal Info</h3>
                    <div className="d-flex flex-wrap">
                        <p className="col-4 text-muted">Full Name</p>
                        <p className="col-8">{user.firstName + " " + user.lastName}</p>
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
        </div>
    )
}