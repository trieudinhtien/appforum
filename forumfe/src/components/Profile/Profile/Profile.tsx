import styles from "./Profile.module.css"
import { useContext, useState, useEffect, useRef } from "react"
import NavigationProfile from "./Navigation/Navigation"
import { UserContext } from '../../../context/UserContext'
import { getAllUser, saveImg, changeAvatar, changeCover } from '../../../apis/users-apis'
import { AuthGuard } from "../../auth/guard/AuthGuard"
import { getPosts, changeAuthorInfoOfPost, changeUserInfoOfComment } from '../../../apis/posts-apis'
import Navigation from '../../Navigation/Navigation'

import Footer from "../../Footer/Footer"

export default function Profile() {

    const context = useContext(UserContext)
    const user = context.user
    const [followers, setFollowers] = useState(0)
    const [posts, setPosts] = useState(0)
    const avatarRef = useRef<HTMLInputElement>(null)
    const coverRef = useRef<HTMLInputElement>(null)

    const _onChangeAvatar = () => {
        let formData = new FormData()
        if (avatarRef?.current?.files) {
            formData.append("file", avatarRef.current.files[0], `avatar${Number(new Date())}.jpg`)
            saveImg(formData)
                .then((res: { path: string }) => {
                    localStorage.setItem('user', JSON.stringify({ ...user, avatar: res.path }))
                    context.setUser({ ...user, avatar: res.path })
                    changeAvatar(user.id, user.token, res.path)
                        .then(res => console.log(res))
                        .catch(err => console.log(err));

                    getPosts()
                        .then((posts: Post[]) => {
                            const postsPromise = [] as Promise<Post>[]
                            posts.forEach((post) => {
                                if (post.author.author_id === user.id) {
                                    postsPromise.push(changeAuthorInfoOfPost(post.id, user.token, { ...post.author, author_img: res.path }))
                                }
                                if (post.comments.length > 0) {
                                    const commentUpdated = post.comments.map(comment => {
                                        if(comment.user_id === user.id) {
                                            return {...comment, user_img: res.path}
                                        }
                                        return comment
                                    })
                                    postsPromise.push(changeUserInfoOfComment(post.id, user.token, commentUpdated))
                                }
                            })
                            if (postsPromise.length > 0) {
                                Promise.all(postsPromise)
                                    .then(res => console.log(res))
                                    .catch(err => console.log(err))
                            }
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    const _onChangeCover = () => {
        let formData = new FormData()
        if (coverRef?.current?.files) {
            formData.append("file", coverRef.current.files[0], `cover${Number(new Date())}.jpg`)
            saveImg(formData)
                .then((res: { path: string }) => {
                    localStorage.setItem('user', JSON.stringify({ ...user, cover: res.path }))
                    context.setUser({ ...user, cover: res.path })
                    changeCover(user.id, user.token, res.path)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        let count = 0
        getAllUser(user.token)
            .then((res: User[]) => {
                res.forEach((eachUser: User) => {
                    if (eachUser.followings_id.includes(user.id)) {
                        count++
                    }
                })
                setFollowers(count)
            })
    }, [])

    useEffect(() => {
        getPosts()
            .then((posts: Post[]) => {
                let count = 0
                posts.forEach((post: Post) => {
                    if (post.author.author_id === user.id) {
                        count++
                    }
                })
                setPosts(count)
            })
    }, [])

    return (
        <AuthGuard moveTo='/login'>
            <Navigation />
            <div className={styles.profile}>
                <div className={styles.profile_inner}>
                    <img className={styles.profile_inner_img} src={user && user.cover} alt="cover" />
                    <div>
                        <input type='file' id="cover" className='d-none' ref={coverRef} onChange={_onChangeCover}></input>
                        <label htmlFor="cover"><i className="fas fa-camera fa-lg"></i></label>
                    </div>
                    <img className={styles.profile_inner_avatar} src={user && user.avatar} alt="avatar" />
                    <div>
                        <input type='file' id="avatar" className='d-none' ref={avatarRef} onChange={_onChangeAvatar}></input>
                        <label htmlFor="avatar"><i className="fas fa-camera fa-lg"></i></label>
                    </div>
                    <div className={"d-flex align-items-center " + styles.profile_inner_description}>
                        <div className={"d-flex col align-items-center " + styles.description_inner}>
                            <div className={"text-center " + styles.des_left}>
                                <p className={"m-0"}>{posts}</p>
                                <p className={"text-muted"}>POSTS</p>
                            </div>
                            <div className={styles.divide}></div>
                            <div className={"text-center " + styles.des_left}>
                                <p className={"m-0"}>{user.followings_id.length}</p>
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
                <NavigationProfile />
            </div>
            <Footer />
        </AuthGuard>
    )
}