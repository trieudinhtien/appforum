import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from '../../apis/home-apies';
import styles from './Post.module.css'
import Detail from "../Home/images/forums-icon.png";
import moment from 'moment';
import { UserContext } from '../../context/UserContext';
import { sendComment, sendLike } from '../../apis/posts-apis';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Swal from 'sweetalert2'


export default function Post() {
    const params = useParams();
    const context = useContext(UserContext)
    const [postDetail, setPostDetail] = useState<Post>();
    const [liked, setLiked] = useState(false)

    const [like, setLike] = useState<Like>({
        id: Date.now(),
        user_id: context.user.id,
        createdAt: moment().format()
    })

    const [commentPost, setCommentPost] = useState<Commentt>({
        id: Date.now(),
        user_id: context.user.id,
        comment: "",
        createdAt: "",
        user_name: context.user.username,
        user_img: context.user.avatar,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCommentPost({
            id: Date.now(),
            user_id: context.user.id,
            comment: "",
            createdAt: moment().format(),
            user_name: context.user.username,
            user_img: context.user.avatar
        })

        if (context.user.token) {
            if (commentPost.comment) {
                if (postDetail) {
                    sendComment(Number(params.id), context.user.token, [...postDetail.comments, commentPost]);
                    setPostDetail({ ...postDetail, comments: [...postDetail.comments, commentPost] });
                    setCommentPost({
                        ...commentPost,
                        comment: ""
                    })
                }
            }
        }
    }
    useEffect(() => {


    }, [commentPost])

    useEffect(() => {
        if (postDetail) {
            postDetail?.likes.map((item) => {
                if (item.user_id === context.user.id)
                    setLiked(true)
            })
        }
    }, [liked])
    useEffect(() => {
        if (params.id) {
            getPostById(Number(params.id))
                .then((data: Post) => {
                    data?.likes.map((item) => {
                        if (item.user_id === context.user.id) {
                            setLiked(true)
                        }
                    })
                })
                .catch((err: Error) => console.log(err));
        }

    }, [])
    const handleDeleteComment = (id: number) => {

        Swal.fire({
            title: 'Do you want to delete this comment?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Delete!', '', 'success')
                let check = false;
                let i = 0;
                postDetail?.comments.map((item, index) => {
                    if (item.id === id && (item.user_id === context.user.id || postDetail.author.author_id === context.user.id)) {
                        check = true;
                        i = index;
                    }
                })
                if (check && postDetail) {
                    let arr = postDetail.comments
                    arr.splice(i, 1);
                    setPostDetail({ ...postDetail, comments: arr })
                    sendComment(Number(params.id), context.user.token, postDetail.comments);
                }
            }
        })

    }
    const handleLike = () => {

        setLike({
            ...like,
            id: Date.now(),
            user_id: context.user.id,
            createdAt: moment().format()
        })
        if (context.user.token && postDetail) {
            if (liked) {
                const listArr = postDetail?.likes;
                let ind = 0;
                listArr.map((item, index) => {
                    if (item.user_id === context.user.id)
                        ind = index;
                })
                postDetail?.likes.splice(ind, 1);
                sendLike(Number(params.id), context.user.token, postDetail);
                setLiked(false);
            }
            else {

                postDetail?.likes.push(like)
                sendLike(Number(params.id), context.user.token, postDetail);
                setLiked(true);
            }
        }
    }

    useEffect(() => {
        if (params.id) {
            getPostById(Number(params.id))
                .then(data => setPostDetail(data))
                .catch((err: Error) => console.log(err));
        }
    }, []);

    return (
        <>
            <Navigation />
            <div className={styles.app + " container"}>
                <div>
                    <div className={styles.banner}>
                        <img className={styles.banner_img} src={Detail} alt="" />
                        <div className={" mx-3"}>
                            <p className={styles.banner_title}>Topic</p>
                            <p className={styles.banner_text}>Post #{postDetail?.id}</p>
                        </div>
                    </div>
                    <div className={styles.forum_heading + ' mt-4'}>
                        <h2 className={styles.forum_title}>{postDetail?.title}</h2>
                    </div>
                    <div>
                        <p className={styles.notification}>This topic has {postDetail?.comments.length} reply, {postDetail?.likes.length} likes</p>
                    </div>
                    <div className={styles.bodyPost}>

                        <div className={styles.content}>
                            <div>
                                <div className={styles.post_item_user}>
                                    {moment(postDetail?.createdAt).format("MMMM DD, YYYY")} at {moment(postDetail?.createdAt).format("hh:mm a")}
                                </div>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: `${postDetail?.content}` }} className={styles.postContent}></div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <i className="fas fa-heart fa-lg mr-1" style={{ color: 'rgb(215, 38, 49)'}}></i> <span className="m-0" style={{fontSize: '18px'}}>{postDetail?.likes.length}</span>
                                </div>
                                <div>
                                    <span className="mr-1 m-0" style={{fontSize: '18px'}}>{postDetail?.comments.length}</span> <i className="far fa-comment-alt fa-lg" style={{ color: 'rgb(215, 38, 49)'}}></i>
                                </div>
                            </div>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.authorContent + ' d-flex justify-content-center'}>
                                <div className={styles.author}>
                                    <img src={postDetail?.author.author_img} alt="avatar" />
                                    <h3>{postDetail?.author.author_name}</h3>
                                    <p>User ID: #{postDetail?.author.author_id}</p>
                                </div>
                            </div>
                            <div className={styles.infoTag}>
                                <i className="fas fa-comment" ></i>
                                <div className={styles.infoTag_text}>
                                    <h5>{postDetail?.comments.length}</h5>
                                    REPLY
                                </div>
                            </div>
                            <div className={styles.infoTag}>

                                <i className="fas fa-heart" ></i>

                                <div className={styles.infoTag_text}>
                                    <h5>{postDetail?.likes.length}</h5>
                                    LIKES
                                </div>
                            </div>
                            <div className={styles.tags}>
                                <p>TAGS</p>
                                <h5>{postDetail?.tags.map(item => (
                                    item + " , "
                                ))}</h5>
                            </div>
                        </div>
                    </div>
                    <div className={styles.function}>
                        <button className={liked ? styles.btn_followed : styles.btn_follow} onClick={handleLike}>
                            {liked ? "Unlike" : "Like"}
                        </button>
                        <label htmlFor='comment' className={styles.btn_comment + ' m-0 text-center'}>Comment</label>
                    </div>
                    <input type="checkbox" className={styles.checkbox + ' d-none'} id='comment'></input>
                    <div className="d-none">
                        {
                            context.user.token ?
                                <div>
                                    <form className={styles.addComment} onSubmit={handleSubmit}>
                                        <br />
                                        <div className="position-relative">
                                            <input
                                                type='text'
                                                className={styles.chat}
                                                placeholder='Enter your comment...'
                                                name='comment'
                                                value={commentPost.comment}
                                                onChange={(e) => setCommentPost({ ...commentPost, comment: e.target.value, createdAt: moment().format() })}
                                            />
                                            <button className={styles.btn_post} type='submit'>Post</button>
                                        </div>
                                    </form>

                                </div>
                                : <p className={styles.notification2}> You have to login to comment on this post! </p>
                        }
                        {
                            postDetail?.comments.map(com => (
                                <div key={com.id} >
                                    <div className={styles.postComment}>

                                        <div className={styles.commentHeader}>
                                            Replied {moment(com?.createdAt).fromNow()}
                                            {
                                                postDetail.author.author_id === context.user.id || com.user_id === context.user.id ?
                                                    <button onClick={() => handleDeleteComment(com.id)} className={styles.btn_delete}><i className="fas fa-times"></i></button> : " "
                                            }
                                        </div>
                                        <div className={styles.postComment_text}>
                                            <div className={""}>
                                                <img className='mb-2' src={com.user_img} alt="" />
                                                <br />
                                                <h4>{com.user_name}</h4>
                                            </div>
                                            <div className={styles.comment_user + ' col'}>{com.comment}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

            </div>
            <Footer />

        </>
    )
}
