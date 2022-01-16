import styles from './UserProfile.module.css'
import stylesFromHome from '../../Home/Home.module.css'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserById, getAllUser, changeFollowings } from '../../../apis/users-apis'
import { UserContext } from '../../../context/UserContext'
import moment from 'moment'
import { getPosts } from '../../../apis/posts-apis'
import Footer from '../../Footer/Footer'
import Navigation from '../../Navigation/Navigation'

export default function UserProfile() {
    const navigate = useNavigate();
    const context = useContext(UserContext)
    const [user, setUser] = useState({} as User)
    const { id } = useParams()
    const [followers, setFollowers] = useState(0)
    const [followed, setFollowed] = useState(false)
    const [posts, setPosts] = useState([] as Post[])
    const [postsOfUserFollowing, setPostsOfUserFollowing] = useState([] as Post[])
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(3);



    useEffect(() => {
        if (id) {
            getUserById(Number(context.user.id), context.user.token)
                .then((res: User) => {
                    if (res.followings_id.includes(Number(id))) {
                        getPosts().then(allPosts => {
                            setPostsOfUserFollowing(
                                allPosts.filter((post) => {
                                    return post.author?.author_id === Number(id);
                                })
                            )
                        })
                    } else {
                        setPostsOfUserFollowing([])
                    }
                })
                .catch(err => console.error(err))
        }
    }, [followed])

    useEffect(() => {
        getPosts()
            .then((listOfPosts: Post[]) => {
                const postsOfUser = [] as Post[]
                listOfPosts.forEach((post: Post) => {
                    if (post.author.author_id === user.id) {
                        postsOfUser.push(post)
                    }
                })
                setPosts(postsOfUser)
            })
            .catch(err => console.log(err))
    }, [id])

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



    const _onClickPrevious = () => {
        if (currentPage === 1) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }
    const _onClickNext = () => {
        if (currentPage === (postsOfUserFollowing.length / usersPerPage)) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage + 1)
        }

    }
    const indexOfLastUsers = currentPage * usersPerPage;
    const indexOfFirstUsers = indexOfLastUsers - usersPerPage;

    const currentUsers = postsOfUserFollowing.slice(indexOfFirstUsers, indexOfLastUsers);
    const pageNumbers = [];
    const paginate = (pageNumber:number) =>{ 
        setCurrentPage(pageNumber)}

    for(let i=1; i<= Math.ceil(postsOfUserFollowing.length / usersPerPage); i++){
        pageNumbers.push(i);
    }

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
            console.log("FOLLOW")
            if (id) {
                const userIDs = context.user?.followings_id
                userIDs.push(parseInt(id))
                changeFollowings(context.user.id, context.user.token, userIDs)
                    .then((res: User) => {
                        context.setUser({ ...context.user, "followings_id": [...res?.followings_id] })
                        localStorage.setItem('user', JSON.stringify({ ...context.user, "followings_id": [...res?.followings_id] }))
                    })
                    .catch(err => console.log(err))
                setFollowed(true)
            }
        }
    }
    const _onClickProfile = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
    }

    return (
        <>
            <Navigation />
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
                                <p className={"m-0"}>{postsOfUserFollowing.length}</p>
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
                                {user.username}
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
                        {
                            followed ?  
                        
                        (<div className={stylesFromHome.post}>
                            <div className={stylesFromHome.post_title}>
                                <div><b>POSTS <i className="fas fa-file-alt" style={{ color: '#5c3c92' }}></i></b></div>
                                <div><b><i className="fas fa-heart" style={{ color: '#d72631' }}></i></b></div>
                                <div><b><i className="fas fa-comment" style={{ color: '#1868ae' }}></i></b></div>
                                <div><b><i className="fas fa-tags" style={{ color: '#a2d5c6' }}></i></b></div>
                            </div>
                            <div className={stylesFromHome.post_content}>
                                {
                                    currentUsers?.map(item => (
                                        <div className={stylesFromHome.post_row} onClick={() => navigate(`/post/${item.id}`)} key={item.id}>
                                            <div className='d-flex align-items-center'>
                                                <div>
                                                    <div className={stylesFromHome.post_item_title}>{item.title}</div>
                                                    <div className={stylesFromHome.post_item_user}>Created by&nbsp;
                                                        <Link to={`/user/${item.author.author_id}`} onClick={e => _onClickProfile(e)}>
                                                            {item.author.author_name}
                                                        </Link>
                                                        &nbsp;{moment(item.createdAt).fromNow()}</div>
                                                </div>
                                            </div>
                                            <div>{item.likes.length}</div>
                                            <div>{item.comments?.length}</div>
                                            <div>{item.tags?.map(tag => (
                                                tag + " "
                                            ))}</div>

                                        </div>))
                                }
                            </div>
                            <ul className={styles.pagination}>
                                <li className={styles.itemPagi} onClick={() => _onClickPrevious()}><i className="fas fa-arrow-left"></i></li>
                                {
                                    pageNumbers.length === 1 ? "" :
                                        pageNumbers.map(number => (
                                            <li onClick={() => paginate(number)} key={number} className={currentPage === number ? `${styles.itemPagi} ${styles.mark}` : `${styles.itemPagi}`}>
                                                {number}
                                            </li>
                                        ))
                                }
                                <li className={styles.itemPagi} onClick={() => _onClickNext()}><i className="fas fa-arrow-right"></i></li>
                            </ul>
                        </div>): <div>User has no posts</div>
                        }
                        {/* {postsOfUserFollowing.map((item)=>(
                            <div key={item.id}>
                                {item.title}
                            </div>

                        ))} */}
                    </div>
                    <div className={styles.main_right}>
                        <h3>Personal Info</h3>
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
            <Footer />
        </>
    )
}