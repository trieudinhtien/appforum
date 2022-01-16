import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../../context/UserContext'
import styles from './About.module.css'
import { getPosts } from '../../../../../apis/posts-apis'
import { Link } from 'react-router-dom'

interface Activity {
    post: Post;
    status: string;
    date: string;
}

export default function About() {

    const context = useContext(UserContext)
    const user = context.user
    const [postActivity, setPostActivity] = useState([] as Activity[])
    const [postInPage, setPostInPage] = useState(postActivity.slice(0, 5))
    let [page, setPage] = useState(1)

    useEffect(() => {
        getPosts()
            .then((posts: Post[]) => {
                const pLiked = [] as Activity[]

                posts.forEach((post: Post) => {
                    for (const like of post.likes) {
                        if (like.user_id === user.id) {
                            pLiked.push({ post: post, date: like.createdAt, status: 'liked' })
                            break;
                        }
                    }
                    for (const comment of post.comments) {
                        if (comment.user_id === user.id) {
                            pLiked.push({ post: post, date: comment.createdAt, status: 'commented' })
                        }
                    }
                })

                if (pLiked.length > 0) {
                    pLiked.sort((a, b) => {
                        if (a.date > b.date) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                    setPostActivity(pLiked)
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setPostInPage(postActivity.slice(0, 5))
    }, [postActivity.length])

    useEffect(() => {
        setPostInPage(postActivity.slice(page * 5 - 5, page * 5))
    }, [page])

    const _onClickPrevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const _onClickNext = () => {
        if (page < Math.ceil(postActivity.length / 5)) {
            setPage(page + 1)
        }
    }

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
                <h3 style={{ color: '#615dfa' }}>Your activities :</h3>
                <ul>
                    {
                        postActivity.length > 0 ?
                            postInPage.map((post, index) => (
                                <li key={index}>
                                    <p className='mb-1'>
                                        You <span style={{ color: 'rgb(215, 38, 49)' }}>{post.status}</span> in <Link to={`/post/${post.post.id}`} style={{ color: 'rgb(97, 93, 250)' }}>{post.post.title}</Link>
                                    </p>
                                    <p>
                                        {
                                            moment(post.date).fromNow()
                                        }
                                    </p>
                                </li>
                            ))
                            : <li>You have no activities before</li>
                    }
                </ul>
                <div className='d-flex justify-content-between align-items-center'>
                    <ul className="pagination m-0">
                        <li className="page-item"><button className="page-link" onClick={_onClickPrevious}><i className="fas fa-arrow-left"></i></button></li>
                        <li className="page-item"><button className="page-link" onClick={_onClickNext}><i className="fas fa-arrow-right"></i></button></li>
                    </ul>
                    <p className="m-0"> Page <span style={{ color: 'rgb(97, 93, 250)' }}>{page}</span></p>
                </div>
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