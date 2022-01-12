import styles from './Followings.module.css'
import { UserContext } from '../../../context/UserContext'
import { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllUser } from '../../../apis/users-apis'

export default function Followings() {

    const context = useContext(UserContext)
    const user = context.user
    const [listOfFollowing, setListOfFollowing] = useState([] as User[])
    const [listOfFollowingsAfterOrder, setListOfFollowingsAfterOrder] = useState(listOfFollowing)
    const [followings, setFollowings] = useState(listOfFollowingsAfterOrder.slice(0, 6))
    const [page, setPage] = useState(1)
    const [orderBy, setOrderBy] = useState('old')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const list = [] as User[]
        const listOfId = user.followings_id
        getAllUser(user.token)
            .then((listOfUser: User[]) => {
                if (listOfId.length > 0) {
                    listOfId.filter(id => {
                        listOfUser.forEach(user => {
                            if(id === user.id){
                                list.push(user)
                            }
                        })
                    })
                    setListOfFollowing(list)
                }
            })
    }, [])

    useEffect(() => {
        setListOfFollowingsAfterOrder(listOfFollowing)
    }, [listOfFollowing])

    useEffect(() => {
        setFollowings(listOfFollowingsAfterOrder.slice(page * 6 - 6, page * 6))
    }, [page])

    useEffect(() => {
        setFollowings(listOfFollowingsAfterOrder.slice(0, 6))
        setPage(1)
    }, [listOfFollowingsAfterOrder])

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
        if (page < Math.ceil(listOfFollowingsAfterOrder.length / 6)) {
            setPage(page + 1)
        }
    }

    const _onChangeSearch = (value: string) => {
        if (orderBy === 'old') {
            setListOfFollowingsAfterOrder(listOfFollowing.filter(following => {
                return (following.firstName + following.lastName).toLowerCase().includes(value)
            }))
        }

        if (orderBy === 'new') {
            setListOfFollowingsAfterOrder(orderNewestFollowings(listOfFollowing).filter(following => {
                return (following.firstName + following.lastName).toLowerCase().includes(value)
            }))
        }

        if (orderBy === 'alphabet') {
            setListOfFollowingsAfterOrder(orderAlphabeticalFollowings(listOfFollowing).filter(following => {
                return (following.firstName + following.lastName).toLowerCase().includes(value)
            }))
        }

        setPage(1)
    }

    const orderNewestFollowings = (listUser: User[]): User[] => {
        return listUser.reduce((prev, next) => {
            return [next, ...prev]
        }, [] as User[])
    }

    const orderAlphabeticalFollowings = (listUser: User[]): User[] => {
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
            setListOfFollowingsAfterOrder(orderNewestFollowings(listOfFollowing))
            setOrderBy('new')
        }

        if (value === 'old') {
            setListOfFollowingsAfterOrder(listOfFollowing)
            setOrderBy('old')
        }

        if (value === 'alphabet') {
            setListOfFollowingsAfterOrder(orderAlphabeticalFollowings(listOfFollowing))
            setOrderBy('alphabet')
        }
    }

    return (
        <div className={styles.main}>
            <p>{user.firstName + ' ' + user.lastName}</p>
            <h2>Followings <span>{user.followings_id.length}</span></h2>
            <div className={styles.search_bar + " d-flex"}>
                <div className="col d-flex align-items-center position-relative">
                    <input id="search" className={"form-control " + styles.input} onChange={e => _onChangeSearch(e.target.value)} ref={inputRef} required />
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
                <p>
                    Showing <span>{listOfFollowingsAfterOrder.length === 0 ? "" : `${(page - 1) * 6 + 1} -`}</span>
                    <span> {page * 6 < listOfFollowingsAfterOrder.length ? page * 6 : listOfFollowingsAfterOrder.length} </span>
                    out of {listOfFollowingsAfterOrder.length} results
                </p>
            </div>
            <div className={styles.list_container}>
                {
                    followings?.length > 0 ?
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
                                    <p className="mt-2">{following.email}</p>
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
                        )) : "No user was found"
                }
            </div>
        </div>
    )
}