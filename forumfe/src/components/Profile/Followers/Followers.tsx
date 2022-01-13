import styles from './Followers.module.css'
import { UserContext } from '../../../context/UserContext'
import { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllUser } from '../../../apis/users-apis'

export default function Followers() {

    const context = useContext(UserContext)
    const user = context.user
    const [listOfFollowers, setListOfFollowers] = useState([] as User[])
    const [listOfFollowersAfterOrder, setListOfFollowersAfterOrder] = useState(listOfFollowers)
    const [Followers, setFollowers] = useState(listOfFollowersAfterOrder.slice(0, 6))
    const [page, setPage] = useState(1)
    const [orderBy, setOrderBy] = useState('old')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        let count = [] as User[]
        getAllUser(user.token)
            .then((res: User[]) => {
                res.forEach((eachUser: User) => {
                    if(eachUser.followings_id.includes(user.id)){
                        count.push(eachUser)
                    }
                })
                setListOfFollowers(count)
            })
    }, [])

    useEffect(() => {
        setListOfFollowersAfterOrder(listOfFollowers)
    }, [listOfFollowers])

    useEffect(() => {
        setFollowers(listOfFollowersAfterOrder.slice(page * 6 - 6, page * 6))
    }, [page])

    useEffect(() => {
        setFollowers(listOfFollowersAfterOrder.slice(0, 6))
        setPage(1)
    }, [listOfFollowersAfterOrder])

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }, [orderBy])

    const _onClickPrevious = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const _onClickNext = () => {
        if (page < Math.ceil(listOfFollowersAfterOrder.length / 6)) {
            setPage(page + 1)
        }
    }

    const _onChangeSearch = (value: string) => {
        if (orderBy === 'old') {
            setListOfFollowersAfterOrder(listOfFollowers.filter(Followers => {
                return (Followers.firstName + Followers.lastName).toLowerCase().includes(value)
            }))
        }

        if (orderBy === 'new') {
            setListOfFollowersAfterOrder(orderNewestFollowers(listOfFollowers).filter(Followers => {
                return (Followers.firstName + Followers.lastName).toLowerCase().includes(value)
            }))
        }

        if (orderBy === 'alphabet') {
            setListOfFollowersAfterOrder(orderAlphabeticalFollowers(listOfFollowers).filter(Followers => {
                return (Followers.firstName + Followers.lastName).toLowerCase().includes(value)
            }))
        }

        setPage(1)
    }

    const orderNewestFollowers = (listUser: User[]): User[] => {
        return listUser.reduce((prev, next) => {
            return [next, ...prev]
        }, [] as User[])
    }

    const orderAlphabeticalFollowers = (listUser: User[]): User[] => {
        return [...listUser].sort((a: User, b: User) => {
            if (a.firstName > b.firstName) {
                return 1
            } else {
                return -1
            }
        })
    }

    const _onChangeOrder = (value: string) => {
        if (value === 'new') {
            setListOfFollowersAfterOrder(orderNewestFollowers(listOfFollowers))
            setOrderBy('new')
        }

        if (value === 'old') {
            setListOfFollowersAfterOrder(listOfFollowers)
            setOrderBy('old')
        }

        if (value === 'alphabet') {
            setListOfFollowersAfterOrder(orderAlphabeticalFollowers(listOfFollowers))
            setOrderBy('alphabet')
        }
    }

    return (
        <div className={styles.main}>
            <p>{user.firstName + ' ' + user.lastName}</p>
            <h2>Followers <span>{listOfFollowers.length}</span></h2>
            <div className={styles.search_bar + " d-flex"}>
                <div className="col d-flex align-items-center position-relative">
                    <input id="search" className={"form-control " + styles.input} onChange={e => _onChangeSearch(e.target.value)} ref={inputRef} required />
                    <label htmlFor="search" className={styles.input_label} >&emsp;Search by name&emsp;</label>
                    <i className="fas fa-search"></i>
                </div>
                <div className="col">
                    <label className={styles.select_label} htmlFor="order">&emsp;Order by&emsp;</label>
                    <select className={"form-control " + styles.input} id="order" onChange={e => _onChangeOrder(e.target.value)}>
                        <option value="old">Oldest Followers</option>
                        <option value="new">Newest Followers</option>
                        <option value="alphabet">Alphabetical</option>
                    </select>
                </div>
            </div>
            <div className={styles.pagination}>
                <ul className="pagination m-0">
                    <li className="page-item"><button className="page-link" onClick={_onClickPrevious}><i className="fas fa-arrow-left"></i></button></li>
                    <li className="page-item"><button className="page-link" onClick={_onClickNext}><i className="fas fa-arrow-right"></i></button></li>
                </ul>
                <p>
                    Showing <span>{listOfFollowersAfterOrder.length === 0 ? "" : `${(page - 1) * 6 + 1} -`}</span>
                    <span> {page * 6 < listOfFollowersAfterOrder.length ? page * 6 : listOfFollowersAfterOrder.length} </span>
                    out of {listOfFollowersAfterOrder.length} results
                </p>
            </div>
            <div className={styles.list_container}>
                {
                    Followers?.length > 0 ?
                        Followers.map((Followers, index) => (
                            <div key={index} className={styles.list_item}>
                                <div className="position-relative">
                                    <img src={Followers.cover ? Followers.cover : ""} alt="cover" />
                                    <img src={Followers.avatar ? Followers.avatar : ""} alt="avatar" />
                                </div>
                                <div className={styles.list_item_content + " text-center"}>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Link to={`/user/${Followers.id}`}>{Followers.firstName + " " + Followers.lastName}
                                        </Link>
                                        <i className="fas fa-check-circle pl-2" style={{ fontSize: '20px', color: '#1DA1F2' }}></i>
                                    </div>
                                    <p className="mt-2">{Followers.email}</p>
                                    <div className={styles.social}>
                                        {
                                            Followers.socialMedia.facebook &&
                                            <a href={Followers.socialMedia.facebook} style={{ backgroundColor: "rgb(55, 99, 210)" }}>
                                                <i className="fab fa-facebook-square"></i>
                                            </a>
                                        }
                                        {
                                            Followers.socialMedia.instagram &&
                                            <a href={Followers.socialMedia.instagram} style={{ backgroundColor: "rgb(248, 70, 141)" }}>
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        }
                                        {
                                            Followers.socialMedia.youtube &&
                                            <a href={Followers.socialMedia.youtube} style={{ backgroundColor: "rgb(253, 67, 79)" }}>
                                                <i className="fab fa-youtube"></i>
                                            </a>
                                        }
                                    </div>
                                    <p className={styles.introduce}>
                                        {Followers.introduce}
                                    </p>
                                </div>
                            </div>
                        )) : "No user was found"
                }
            </div>
        </div>
    )
}