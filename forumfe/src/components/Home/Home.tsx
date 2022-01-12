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
            {
                post?.map(item =>(
                    <Card>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                Popularity: {item.content}
                            </Card.Text>
                            <Card.Text>
                                {item.user_id}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
        // </AuthGuard>

    )
}
