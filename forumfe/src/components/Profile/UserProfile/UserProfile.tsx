import styles from './UserProfile.module.css'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById, getAllUser, changeFollowings } from '../../../apis/users-apis'
import { UserContext } from '../../../context/UserContext'
import moment from 'moment'
import { getPosts } from '../../../apis/posts-apis'

export default function UserProfile() {

    const context = useContext(UserContext)
    const [user, setUser] = useState({} as User)
    const { id } = useParams()
    const [followers, setFollowers] = useState(0)
    const [followed, setFollowed] = useState(false)
    const [posts, setPosts] = useState([] as Post[])

    useEffect(() => {
        getPosts()
            .then((listOfPosts: Post[]) => {
                const postsOfUser = [] as Post[]
                listOfPosts.forEach((post: Post) => {
                    if(post.id === user.id) {
                        postsOfUser.push(post)
                    }
                })
                setPosts(postsOfUser)
            })
            .catch(err => console.log(err))
    }, [id])

    console.log("posts", posts)

    useEffect(() => {
        if (id) {
            if (context.user.followings_id.includes(parseInt(id))) {
                setFollowed(true)
            } else {
                setFollowed(false)
            }
        }
    }, [id])

    useEffect(() => {
        if (id) {
            getUserById(parseInt(id), context.user.token)
                .then((res: User) => setUser(res))
                .catch(err => console.error(err))
        }
    }, [id])

    useEffect(() => {
        let count = 0
        if (id) {
            getAllUser(context.user.token)
                .then((res: User[]) => {
                    res?.forEach((eachUser: User) => {
                        if (eachUser.followings_id.includes(parseInt(id))) {
                            count++
                        }
                    })
                    setFollowers(count)
                })
                .catch(err => console.error(err))
        }
    }, [id, context.user.followings_id.length])

    useEffect(() => {
        if (id) {
            if (context.user.followings_id?.includes(parseInt(id))) {
                setFollowed(true)
            }
        }
    }, [followed])

    const _onClickFollow = () => {
        if (followed) {
            if (id) {
                const userIDs = context.user.followings_id
                userIDs.splice(userIDs.indexOf(parseInt(id)), 1)
                changeFollowings(context.user.id, context.user.token, userIDs)
                    .then((res: User) => {
                        context.setUser({ ...context.user, "followings_id": [...res.followings_id] })
                        localStorage.setItem('user', JSON.stringify({ ...context.user, "followings_id": [...res.followings_id] }))
                    })
                    .catch(err => console.log(err))
                setFollowed(false)
            }
        } else {
            if (id) {
                const userIDs = context.user.followings_id
                userIDs.push(parseInt(id))
                changeFollowings(context.user.id, context.user.token, userIDs)
                    .then((res: User) => {
                        context.setUser({ ...context.user, "followings_id": [...res.followings_id] })
                        localStorage.setItem('user', JSON.stringify({ ...context.user, "followings_id": [...res.followings_id] }))
                    })
                    .catch(err => console.log(err))
                setFollowed(true)
            }
        }
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profile_inner}>
                <img className={styles.profile_inner_img} src={user && user.cover} alt="cover" />
                <img className={styles.profile_inner_avatar} src={user && user.avatar} alt="avatar" />
                <button className={followed ? styles.btn_followed : styles.btn_follow} id='btn' onClick={_onClickFollow}>
                    {followed ? "Followed" : "Follow"}
                </button>
                <div className={"d-flex align-items-center " + styles.profile_inner_description}>
                    <div className={"d-flex col align-items-center " + styles.description_inner}>
                        <div className={"text-center " + styles.des_left}>
                            <p className={"m-0"}>{posts.length}</p>
                            <p className={"text-muted"}>POSTS</p>
                        </div>
                        <div className={styles.divide}></div>
                        <div className={"text-center " + styles.des_left}>
                            <p className={"m-0"}>{user?.followings_id?.length || '0'}</p>
                            <p className={"text-muted"}>FOLLOWINGS</p>
                        </div>
                        <div className={styles.divide}></div>
                        <div className={"text-center " + styles.des_left}>
                            <p className={"m-0"}>{followers}</p>
                            <p className={"text-muted"}>FOLLOWERS</p>
                        </div>
                    </div>
                    <div className={"text-center col " + styles.description_inner}>
                        <div className={"" + styles.des_name}>
                            {user.firstName + " " + user.lastName}
                            <i className="fas fa-check-circle pl-2" style={{ fontSize: '20px', color: '#1DA1F2' }}></i>
                        </div>
                        <div className={"" + styles.des_email}>
                            {user.email}
                        </div>
                    </div>
                    <div className={"text-center col d-flex justify-content-center " + styles.description_inner}>
                        <a className={styles.des_social} href={user.socialMedia?.facebook ? user.socialMedia.facebook : "#"} style={{ backgroundColor: '#3763d2' }}>
                            <i className="fab fa-facebook-square"></i>
                        </a>
                        <a className={styles.des_social} href={user.socialMedia?.instagram ? user.socialMedia.instagram : "#"} style={{ backgroundColor: '#f8468d' }}>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className={styles.des_social} href={user.socialMedia?.youtube ? user.socialMedia.youtube : "#"} style={{ backgroundColor: '#fd434f' }}>
                            <i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.outer + " d-flex justify-content-between"}>
                <div className={styles.main_left}>
                    <h3>About Me</h3>
                    <p className={styles.introduce}>{user.introduce}</p>
                </div>
                <div className={styles.main_center}>
                    <h3>List of Posts here</h3>
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
        </div>
    )
}