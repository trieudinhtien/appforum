import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { getPost } from '../../apis/home-apies';
import { AuthGuard } from '../auth/guard/AuthGuard';
import styles from "./Home.module.css"

export default function Home() {

    const [post, setpost] = useState<Post[]>([]);
    useEffect(() => {
        getPost().then(data => setpost(data))
            .catch(err => console.error(err))
        console.log(post);
    }, [])

    return (
        // <AuthGuard moveTo='/login'>
        <div className={"container " + styles.module}>
            <div>
                <div className={styles.banner}>
                    <img className={styles.banner_img} src={require("./images/forums-icon.png")} alt="" />
                    <div className={" mx-3"}>
                        <p className={styles.banner_title}>Forums</p>
                        <p className={styles.banner_text}>Talk about anything you want!</p>
                    </div>
                </div>
                <div className={styles.forum_heading}>
                    <h2 className={styles.forum_pretitle}>WELCOME TO</h2>
                    <h2 className={styles.forum_title}>Community Vikinger4</h2>
                </div>
                <div className={styles.search}>
                    <div>
                        <form action="">
                            <div className={styles.blank}>
                                <label htmlFor="search" className={styles.labeltop}>Search Post</label>
                                <input type="text" placeholder='Search...' id='search' name='search' value="" />
                                <button className={styles.button_search}><i className="fas fa-search"></i></button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={styles.post}>

                <div className={styles.post_title}>
                    <div>POSTS</div>
                    <div>LIKES</div>
                    <div>COMMENTS</div>
                    <div>TAGS</div>
                </div>
                {
                    post?.map(item => (
                        <div className={styles.post_item}>
                            <div>
                                <div className={styles.post_item_title}>{item.title}</div>
                                <div className={styles.post_item_user}>Created 5 hours ago</div>
                            </div>
                            <div>{item.likes}</div>
                            <div>{item.comments?.length}</div>
                            <div>{item.tags?.map(tag =>(
                                tag +" "
                            ))}</div>
                        </div>
                    ))
                }
            </div>
        </div>
        // </AuthGuard>

    )
}
