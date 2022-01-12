import styles from './Followings.module.css'
import { UserContext } from '../../../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Followings() {

    const context = useContext(UserContext)
    const user = context.user
    const [userFollowings, setUserFollowings] = useState(user.followings)
    const [page, setPage] = useState(1)
    const [followings, setFollowings] = useState(userFollowings.slice(0, 6))

    // useEffect(() => {
    //     console.log("user", user.followings)
    //     setFollowings(userFollowings.slice(0, 6))
    // }, [])

    useEffect(() => {
        setFollowings(userFollowings.slice(page * 6 - 6, page * 6))
    }, [page])

    useEffect(() => {
        setFollowings(userFollowings.slice(0, 6))
        setPage(1)
    }, [userFollowings])

    const _onClickPrevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    // console.log(followings)

    const _onClickNext = () => {
        if (page < Math.ceil(user.followings.length / 6)) {
            setPage(page + 1)
        }
    }

    const _onChangeSearch = () => {
        setPage(1)

    }

    const _onChangeOrder = (value: string) => {
        if (value === 'new') {
            setUserFollowings(user.followings.reduce((prev, next) => {
                return [next, ...prev]
            }, [] as Following[]))
        }

        if (value === 'old') {
            setUserFollowings(user.followings)
        }

        if (value === 'alphabet') {
            setUserFollowings([...user.followings].sort((a: Following, b: Following) => {
                if (a.firstName > b.firstName) {
                    return 1
                } else {
                    return -1
                }
            }))
        }
    }

    return (
        <div className={styles.main}>
            <p>{user.firstName + ' ' + user.lastName}</p>
            <h2>Followings <span>{user.followings.length}</span></h2>
            <div className={styles.search_bar + " d-flex"}>
                <div className="col d-flex align-items-center position-relative">
                    <input id="search" className={"form-control " + styles.input} onChange={_onChangeSearch} />
                    <label htmlFor="search" className={styles.input_label} >&emsp;Search by name&emsp;</label>
                    <i className="fas fa-search"></i>
                </div>
                <div className="col">
                    <label className={styles.select_label} htmlFor="order">&emsp;Order by&emsp;</label>
                    <select className={"form-control " + styles.input} id="order" onChange={e => _onChangeOrder(e.target.value)}>
                        <option value="old">Oldest Followings</option>
                        <option value="new">Newest Followings</option>
                        <option value="alphabet">Alphabetical</option>
                    </select>
                </div>
            </div>
            <div className={styles.pagination}>
                <ul className="pagination m-0">
                    <li className="page-item"><button className="page-link" onClick={_onClickPrevious}><i className="fas fa-arrow-left"></i></button></li>
                    <li className="page-item"><button className="page-link" onClick={_onClickNext}><i className="fas fa-arrow-right"></i></button></li>
                </ul>
                <p>Showing <span>{(page - 1) * 6 + 1}</span> - <span>{page * 6 < user.followings.length ? page * 6 : user.followings.length}</span> out of {user.followings.length} results</p>
            </div>
            <div className={styles.list_container}>
                {
                    followings?.length &&
                    followings.map((following, index) => (
                        <div key={index} className={styles.list_item}>
                            <div className="position-relative">
                                <img src={following.cover ? following.cover : ""} alt="cover" />
                                <img src={following.avatar ? following.avatar : ""} alt="avatar" />
                            </div>
                            <div className={styles.list_item_content + " text-center"}>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link to={`/user/${following.id}`}>{following.firstName + " " + following.lastName}
                                    </Link>
                                    <i className="fas fa-check-circle pl-2" style={{ fontSize: '20px', color: '#1DA1F2' }}></i>
                                </div>
                                <p>{following.email}</p>
                                <div className={styles.social}>
                                    {
                                        following.socialMedia.facebook &&
                                        <a href={following.socialMedia.facebook} style={{ backgroundColor: "rgb(55, 99, 210)" }}>
                                            <i className="fab fa-facebook-square"></i>
                                        </a>
                                    }
                                    {
                                        following.socialMedia.instagram &&
                                        <a href={following.socialMedia.instagram} style={{ backgroundColor: "rgb(248, 70, 141)" }}>
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    }
                                    {
                                        following.socialMedia.youtube &&
                                        <a href={following.socialMedia.youtube} style={{ backgroundColor: "rgb(253, 67, 79)" }}>
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    }
                                </div>
                                <p className={styles.introduce}>
                                    {following.introduce}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}