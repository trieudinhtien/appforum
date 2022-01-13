import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getPostById } from '../../apis/home-apies';
import styles from './Post.module.css'
import Banner from "../Home/images/banner-bg.png";
import Detail from "../Home/images/forums-icon.png";
import moment from 'moment';
import { UserContext } from '../../context/UserContext';
import { getUserById } from '../../apis/users-apis';
import { Card } from 'react-bootstrap';

export default function Post() {
    const params = useParams();
    const [postDetail, setpostDetail] = useState<Post>();
    const context = useContext(UserContext)
    const [user, setUser] = useState({} as User)


    useEffect(() => {
        if (params.id) {
            getPostById(Number(params.id))
                .then(data => setpostDetail(data))
                .catch((err: Error) => console.log(err));
        }
    }, []);
    useEffect(() => {
        if (postDetail?.user_id) {
            getUserById(postDetail?.user_id, context.user.token)
                .then((res: User) => setUser(res))
                .catch(err => console.error(err))
        }
    }, [postDetail?.user_id])

    return (
        <div className={styles.app + " container"}>
            <div className={styles.banner}>
                <img className={styles.banner_img} src={Detail} alt="" />
                <div className={" mx-3"}>
                    <p className={styles.banner_title}>Forums</p>
                    <p className={styles.banner_text}>Talk about anything you want!</p>
                </div>
            </div>
            <div className={styles.forum_heading}>
                <h2 className={styles.forum_pretitle}>WELCOME TO</h2>
                <h2 className={styles.forum_title}>{postDetail?.title}</h2>
            </div>
            <div>
                <p className={styles.notification}>This topic has {postDetail?.comments.length} reply, {postDetail?.likes} likes</p>
            </div>
            <div className={styles.content}>
                <div className={styles.post_item_user}> {moment(postDetail?.createdAt).format("MMMM DD, YYYY")}
                    at {moment(postDetail?.createdAt).format("hh:mm a")}
                </div>
                <div className='d-flex justify-content-between'>
                    <div className={styles.author}>
                        <img src={user.avatar} alt="avatar" />
                        <div>{user.firstName}  {user.lastName}</div>
                        <div>{user.username}</div>
                    </div>
                    <div>
                  <button>Like</button> 
                    <Card>
                        <Card.Body key={postDetail?.id}>
                            <Card.Title>Reply</Card.Title>
                            <Card.Text>{postDetail?.comments.length}</Card.Text>
                            
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body key={postDetail?.id}>
                            <Card.Title>Likes</Card.Title>
                            <Card.Text>{postDetail?.likes}</Card.Text>
                            
                        </Card.Body>
                    </Card>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: `${postDetail?.content}` }}></div>
            </div>
            <div>{postDetail?.comments.map(com => (
                <div>
                    <div className={styles.post_item_user}> {moment(com?.createdAt).format("MMMM DD, YYYY")}</div>
                    <br />
                    {com.user_id}   {com.comment}
                </div>
            ))}</div>
        </div>
    )
}
