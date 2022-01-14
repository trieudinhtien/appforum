import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from '../../apis/home-apies';
import styles from './Post.module.css'
import Detail from "../Home/images/forums-icon.png";
import moment from 'moment';
import { UserContext } from '../../context/UserContext';
import { Card } from 'react-bootstrap';
import { AuthGuard } from '../auth/guard/AuthGuard';
import { sendComment, sendLike } from '../../apis/posts-apis';

export default function Post() {
    const params = useParams();
    const navigate = useNavigate();

    const context = useContext(UserContext)
    const [postDetail, setpostDetail] = useState<Post>();
    const [liked, setLiked] = useState(false)
    const [like, setlike] = useState<Like>({
        id: Date.now(),
        user_id: context.user.id,
        createdAt: moment().format()
    })
    const [commentPost, setCommentPost] = useState<Commentt>({
        id: Date.now(),
        user_id: context.user.id,
        comment: "",
        createdAt: moment().format(),
        user_name: context.user.username,
        user_img: context.user.avatar,
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (context.user.token) {
            if (commentPost.comment) {
                postDetail?.comments.push(commentPost);
                if (postDetail) {
                    sendComment(Number(params.id), context.user.token, [...postDetail.comments, commentPost]);
                    setCommentPost({
                        ...commentPost,
                        comment: ""
                    })
                }
            }
        }
        // navigate(`/post/${params.id}`)
    }
    useEffect(() => {
        if(postDetail){
            postDetail?.likes.map((item) =>{
                if(item.user_id === context.user.id)
                setLiked(true)
            })
        }
    }, [liked])
    useEffect(() => {
        if(params.id){
            postDetail?.likes.map((item) =>{
                if(item.user_id === context.user.id)
                setLiked(true)
                else setLiked(false)
            })
        }
       
    }, [])
    
    const handleLike = () => {
        
                    setlike({
                        ...like,
                        id: Date.now(),
                        user_id: context.user.id,
                        createdAt: moment().format()
                    })
        if (context.user.token && postDetail) {
            // postDetail?.likes.push(like)
            // if (postDetail) {
            //     sendLike(Number(params.id), context.user.token, postDetail);
            // }
            if(liked){
                const listArr = postDetail?.likes;
                let ind = 0;
                listArr.map((item,index) =>{
                    if(item.user_id === context.user.id)
                    ind = index;
                })
                postDetail?.likes.splice(ind,1);
                sendLike(Number(params.id), context.user.token, postDetail);
                setLiked(false);
            }
            else{
                
            postDetail?.likes.push(like)
            sendLike(Number(params.id), context.user.token, postDetail);
            setLiked(true);
            }
        }
    }



    useEffect(() => {
        if (params.id) {
            getPostById(Number(params.id))
                .then(data => setpostDetail(data))
                .catch((err: Error) => console.log(err));
        }
    }, []);

    return (
        <div className={styles.app + " container"}>
            <div className={styles.banner}>
                <img className={styles.banner_img} src={Detail} alt="" />
                <div className={" mx-3"}>
                    <p className={styles.banner_title}>Topic</p>
                    <p className={styles.banner_text}>Talk about anything you want!</p>
                </div>
            </div>
            <div className={styles.forum_heading}>
                <h2 className={styles.forum_pretitle}>WELCOME TO</h2>
                <h2 className={styles.forum_title}>{postDetail?.title}</h2>
            </div>
            <div>
                <p className={styles.notification}>This topic has {postDetail?.comments.length} reply, {postDetail?.likes.length} likes</p>
            </div>
            <div className={styles.content}>
                <div className={styles.post_item_user}> {moment(postDetail?.createdAt).format("MMMM DD, YYYY")} at {moment(postDetail?.createdAt).format("hh:mm a")}
                </div>
                <div className='d-flex justify-content-between'>
                    <div className={styles.author}>
                        <img src={postDetail?.author.author_img} alt="avatar" />
                        <div>{postDetail?.author.author_name}</div>
                    </div>
                    <div>
                        <button onClick={handleLike}>{liked ? "Unlike" : "Like"}</button>
                        <Card>
                            <Card.Body >
                                <Card.Title>Reply <i className="fas fa-comment" style={{ color: '#1868ae' }}></i></Card.Title>
                                <Card.Text>{postDetail?.comments.length}</Card.Text>

                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body >
                                <Card.Title>Likes <i className="fas fa-heart" style={{ color: '#d72631' }}></i></Card.Title>
                                <Card.Text>{postDetail?.likes.length}</Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: `${postDetail?.content}` }}></div>
            </div>
            <div>{postDetail?.comments.map(com => (
                <div key={com.id}>
                    <div className={styles.post_item_user}>
                        {moment(com?.createdAt).format("MMMM DD, YYYY")}
                        <br />
                        {com.user_name} <br />
                        <img src={com.user_img} style={{ maxWidth: '5rem' }} alt="" />
                        {com.comment}
                    </div>

                </div>
            ))}
            </div>
            <AuthGuard moveTo="/login">
                <div>
                    <form className={styles.addComment} onSubmit={handleSubmit}>
                        <label htmlFor="">Comment</label>
                        <input type="text"
                            placeholder='Enter your comment...'
                            name='comment'
                            value={commentPost.comment}
                            maxLength={60}
                            onChange={(e) => setCommentPost({ ...commentPost, comment: e.target.value })}
                        />
                        <button type='submit'>Post</button>
                    </form>
                </div>
            </AuthGuard>
        </div>
    )
}
