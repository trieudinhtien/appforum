import { useEffect, useState } from 'react'
import { getPost } from '../../apis/home-apies';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import styles from "./Home.module.css"
import { Tags } from './tags/Tags';
import moment from "moment";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const [post, setPost] = useState<Post[]>([]);
    const [result, setResult] = useState<Post[]>([]);
    const [page, setPage] = useState(1)
    const [filterTags, setTags] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPost().then((data) => {
            setPost(data.reduce((prev: Post[], next: Post) => {
                return [next, ...prev]
            }, [] as Post[]));
            setResult(data.reduce((prev: Post[], next: Post) => {
                return [next, ...prev]
            }, [] as Post[]).slice(0, 6));
        })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        setResult(post.slice(page * 6 - 6, page * 6))
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
        setResult(post.filter(item => {
            return item.title.toLowerCase().includes(value)
        }).slice(page * 6 - 6, page * 6))
        setPage(1);
    }

    const onClickTags = (item: string): void => {
        if (item) {
            let clonePost = [...post]
            const a = clonePost.filter((element) => {
                return element.tags.includes(item)
            })
            setResult(a)
        } else {
            setResult(post)
        }
        setPage(1);
    }

    const _onClickProfile = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.stopPropagation();
    }

    const _onClickSpanTags = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
        onClickTags((e.target as HTMLSpanElement).innerText);
    }

    return (
        <>
            <Navigation />
            <div className={styles.module}>
                <div>
                    <div className={styles.banner}>
                        <img className={styles.banner_img} src={require("./images/forums-icon.png")} alt="banner" />
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
                            <div className='d-flex'>
                                <div className={styles.blank + " col"}>
                                    <div className='my-auto' style={{ height: 'fit-content' }}>
                                        <p className={styles.labeltop}>What are you looking for?</p>
                                        <div className={styles.wrapper_input}>
                                            <input type="text" onChange={e => _onChangeSearch(e.target.value)} className={"form-control " + styles.search_input} id='search' required />
                                            <label htmlFor="search" className={styles.label_inline}>Search by topic</label>
                                            <button className={styles.button_search}><i className={"fas fa-search " + styles.search_icon}></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <Tags post={post} onClickTags={onClickTags} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.post}>
                    <div className={styles.post_title}>
                        <div><b>POSTS <i className="fas fa-file-alt" style={{ color: '#5c3c92' }}></i></b></div>
                        <div><b>LIKES <i className="fas fa-heart" style={{ color: '#d72631' }}></i></b></div>
                        <div><b>COMMENTS <i className="fas fa-comment" style={{ color: '#1868ae' }}></i></b></div>
                        <div><b>TAGS <i className="fas fa-tags" style={{ color: '#a2d5c6' }}></i></b></div>
                    </div>
                    <div className={styles.post_content}>
                        {
                            result?.map(item => (
                                <div className={styles.post_row} onClick={() => navigate(`/post/${item.id}`)} key={item.id}>
                                    <div className='d-flex align-items-center'>
                                        <div className={styles.row_img}>
                                            <img src={item.author.author_img} alt='avatar' />
                                        </div>
                                        <div>
                                            <div className={styles.post_item_title}>{item.title}</div>
                                            <div className={styles.post_item_user}>Created by&nbsp;
                                                <Link to={`/user/${item.author.author_id}`} style={{ color: '#615dfa' }} onClick={e => _onClickProfile(e)}>
                                                    {item.author.author_name}
                                                </Link>
                                                &nbsp;{moment(item.createdAt).fromNow()}</div>
                                        </div>
                                    </div>
                                    <div><b style={{ color: '#d72631' }}>{item.likes.length}</b></div>
                                    <div><b style={{ color: '#1868ae' }}>{item.comments.length}</b></div>
                                    <div className={styles.tags}>
                                        {
                                            item.tags?.map((tag, index) => (
                                                <span key={index} onClick={e => _onClickSpanTags(e)}>{tag}</span>
                                            ))
                                        }
                                    </div>

                                </div>))
                        }
                    </div>
                    <div className={styles.pagination}>
                        <ul className="pagination m-0">
                            <li className="page-item"><button className="page-link" onClick={_onClickPrevious}><i className="fas fa-arrow-left"></i></button></li>
                            <li className="page-item"><button className="page-link" onClick={_onClickNext}><i className="fas fa-arrow-right"></i></button></li>
                        </ul>
                        <p>
                            Page <span>{page} </span>
                            out of {Math.ceil(post.length / 6)}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
