import React, { useEffect, useState } from 'react'
import { getPost } from '../../apis/home-apies';
import styles from "./Home.module.css"
import { Tags } from './tags/Tags';
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [post, setpost] = useState<Post[]>([]);
    const [result, setresult] = useState<Post[]>([]);
    const [page, setPage] = useState(1)
    const [filterTags, setTags] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPost().then(data => {
            setpost(data);
            setresult(data.slice(0, 6));
        })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        setresult(post.slice(page * 6 - 6, page * 6))
        console.log(page);
    }, [page])

    const _onClickPrevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const _onClickNext = () => {
        if (page < Math.ceil(post.length / 6)) {
            setPage(page + 1)
        }

    }

    const _onChangeSearch = (value: string) => {
        setTags(filterTags.filter(item => {
            return item.title.toLowerCase().includes(value)
        }))
        setresult(post.filter(item => {
            return item.title.toLowerCase().includes(value)

        }).slice(page * 6 - 6, page * 6))
        setPage(1);
    }

    const onClickTags = (item: string): void => {
        console.log(item)
        let clonePost = [...post]
        const a = clonePost.filter((element) => {
            return element.tags.includes(item)
        })
        setTags(a)
        setPage(1);
    }
    // useEffect(() => {
    //     post && setpost(post)
    // }, [post])
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
                        <div className={styles.blank}>
                            <label htmlFor="search" className={styles.labeltop}>Search Post</label>
                            <input type="text" onChange={e => _onChangeSearch(e.target.value)} placeholder='Search...' id='search' required />
                            <button className={styles.button_search}><i className={"fas fa-search " + styles.search_icon}></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.post}>
                <Tags post={post} onClickTags={onClickTags} />
                <div className={styles.post_title}>
                    <div>POSTS</div>
                    <div>LIKES</div>
                    <div>COMMENTS</div>
                    <div>TAGS</div>
                </div>
                {
                    filterTags.length !== 0 ? filterTags :
                        result?.map(item => (
                            <div className={styles.post_item} onClick={() => navigate(`/post/${item.id}`)} key={item.id}>
                                <div>
                                    <div className={styles.post_item_title}>{item.title}</div>
                                    <div className={styles.post_item_user}>Created {moment(item.createdAt).fromNow()}</div>
                                    <div>{item.likes.length}</div>
                                    <div>{item.comments?.length}</div>
                                    <div>{item.tags?.map(tag => (
                                        tag + " "
                                    ))}</div>
                                </div>
                            </div>))
                }
                <div className={styles.pagination}>
                    <ul className="pagination m-0">
                        <li className="page-item"><button className="page-link" onClick={_onClickPrevious}><i className="fas fa-arrow-left"></i></button></li>
                        <li className="page-item"><button className="page-link" onClick={_onClickNext}><i className="fas fa-arrow-right"></i></button></li>
                    </ul>
                    <p>
                        Page <span>{page} </span>
                        out of {result.length < post.length}
                    </p>
                </div>
            </div>
        </div>
        // </AuthGuard>
    )
}
