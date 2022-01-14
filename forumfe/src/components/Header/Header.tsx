import { FC, useContext, useEffect, useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../images/logo.png";
import Avatar from "../../images/avatar/01.jpg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Logout } from "../auth/Logout/Logout";
import { Link } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { getPosts } from "../../apis/posts-apis";
import { getAllUser } from "../../apis/users-apis";
import moment from "moment";

const Header: FC<{}> = () => {
  const [turnSet, setTurnSet] = useState<boolean>(false);
  const [turnNoti, setTurnNoti] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notificationn[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const postContext = useContext(PostContext);
  const userContext = useContext(UserContext);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<boolean>(false);

  let navigate = useNavigate();

  const user = userContext.user;

  const _clickLogin = () => {
    navigate("/login");
  };

  const turnNotification = () => {
    setTurnNoti(!turnNoti);
    setTurnSet(false);
    setSearchResult(false);
  };

  const turnSetting = () => {
    setTurnSet(!turnSet);
    setTurnNoti(false);
    setSearchResult(false);
  };

  useEffect(() => {
    if (search) setSearchResult(true);
    else setSearchResult(false);

    setTurnSet(false);
    setTurnNoti(false);
  }, [search]);

  useEffect(() => {
    if (userContext.user.token)
      getAllUser(userContext.user.token).then((data) => setUsers(data));
    getPosts()
      .then((data) => {
        postContext.setPosts(data);
      })
      .catch((err: Error) => console.log(err));
  }, [userContext, search]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        const noti: Notificationn[] = [];
        const newData = data.filter((item: Post) => {
          if (item.author.author_id === userContext.user.id) return item;
          return 0;
        });

        newData.forEach((item: Post) => {
          if (item.likes.length > 0) {
            item.likes.forEach((like) => {
              users.forEach((user: User) => {
                if (
                  user.id === like.user_id &&
                  user.id !== userContext.user.id
                ) {
                  noti.push({
                    id: like.id,
                    type: "like",
                    user_name: user.username,
                    user_img: user.avatar,
                    createdAt: like.createdAt,
                  });
                }
              });
            });
          }

          if (item.comments.length > 0) {
            item.comments.forEach((comment) => {
              users.forEach((user: User) => {
                if (
                  user.id === comment.user_id &&
                  user.id !== userContext.user.id
                ) {
                  noti.push({
                    id: comment.id,
                    type: "comment",
                    user_name: user.username,
                    user_img: user.avatar,
                    createdAt: comment.createdAt,
                  });
                }
              });
            });
          }
        });

        const noti2 = noti.sort(
          (a: { createdAt: string }, b: { createdAt: string }) => {
            if (moment(a.createdAt).isBefore(b.createdAt)) return 1;
            else if (moment(a.createdAt).isAfter(b.createdAt)) return -1;
            else return 0;
          }
        );

        setNotification(noti2);
      })
      .catch((err: Error) => console.log(err));
  }, [postContext.posts]);

  return (
    <div className={styles.header}>
      <div className={styles.header_actions}>
        <div className={styles.header_brand}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" />
          </div>

          <p className={styles.header_brand_text}>Vikinger4</p>
        </div>
      </div>

      <div className={styles.header_actions}>
        <nav className={styles.navigation}>
          <ul className={styles.menu_main}>
            <li className="menu-main-item">
              <Link className={styles.menu_main_item_link} to="/home">
                Home
              </Link>
            </li>
            <li className="menu-main-item">
              <a className={styles.menu_main_item_link} href="#">
                Features
              </a>
            </li>
            <li className="menu-main-item">
              <a className={styles.menu_main_item_link} href="#">
                Faqs
              </a>
            </li>
            <li className="menu-main-item">
              <Link className={styles.menu_main_item_link} to="/register">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${styles.header_actions} ${styles.search_bar}`}>
        <div className={styles.interactive_input}>
          <input
            type="text"
            name="search"
            placeholder={`Search here for${
              userContext.user.token && " people or"
            } posts`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.interactive_input_icon_wrap}>
            <i className="fas fa-search"></i>
          </div>
          {searchResult && (
            <div className={styles.search_result}>
              {userContext.user.token && search && (
                <div className={styles.search_result_title}>Members</div>
              )}
              {userContext.user.token && search && (
                <ul className={styles.search_result_members}>
                  {users.map((item: User) => {
                    if (
                      search &&
                      item.username
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                      item.id !== userContext.user.id
                    ) {
                      return (
                        <li key={item.id}>
                          <div>
                            <img
                              className={styles.search_result_img}
                              src={item.avatar}
                              alt="avatar"
                            />
                          </div>
                          <div className={styles.search_result_text}>
                            <p>
                              <span>{item.username}</span>
                            </p>
                            <p>{item.followings_id.length} followers</p>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              )}
              <div className={styles.search_result_title}>Posts</div>
              <ul className={styles.search_result_members}>
                {postContext.posts.map((item: Post, index: number) => {
                  if (
                    search &&
                    item.title.toLowerCase().includes(search.toLowerCase())
                    // && item.author.author_id !== userContext.user.id
                  ) {
                    return (
                      <li key={index}>
                        <div>
                          <img
                            className={styles.search_result_img}
                            src={item.author.author_img}
                            alt="avatar"
                          />
                        </div>
                        <div className={styles.search_result_text}>
                          <p>
                            <span>{item.title}</span>
                          </p>
                          <p>{item.likes.length} likes</p>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.header_actions} ${styles.header_actions_list}`}>
        {/* Notification */}
        {localStorage.getItem("user") ? (
          <div className={styles.notifications}>
            <i className="far fa-bell" onClick={turnNotification}></i>
            <span>{notification && "."}</span>

            {turnNoti && (
              <div className={styles.notifications_box}>
                <p>Notifications</p>
                <ul>
                  {notification.length > 0 &&
                    notification.map((item: Notificationn, index: number) => {
                      if (item.type === "like") {
                        return (
                          <li key={index}>
                            <div>
                              <img
                                className={styles.notifications_img}
                                src={item.user_img}
                                alt="avatar"
                              />
                            </div>
                            <div className={styles.notifications_text}>
                              <p>
                                <span>{item.user_name}</span> left a like on
                                your post
                              </p>
                              <p>{moment(item.createdAt).fromNow()}</p>
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            <div>
                              <img
                                className={styles.notifications_img}
                                src={item.user_img}
                                alt="avatar"
                              />
                            </div>
                            <div className={styles.notifications_text}>
                              <p>
                                <span>{item.user_name}</span> posted a comment
                                on your post
                              </p>
                              <p>{moment(item.createdAt).fromNow()}</p>
                            </div>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {/* Setting */}
        {localStorage.getItem("user") ? (
          <div className={styles.settings}>
            <i onClick={turnSetting} className="fas fa-cog"></i>
            <div
              className={
                turnSet ? styles.turn_On_setting : styles.turn_Off_setting
              }
            >
              <ul>
                <li>
                  <div className={styles.settings_header}>
                    <img src={Avatar} alt="avatar" />
                    <p>Hi Marina!</p>
                  </div>
                  <hr />
                </li>
                <li>
                  <NavLink to="/profile">Profile Info</NavLink>
                </li>
                <li>
                  <NavLink to="/profile/settings/password">
                    Change password
                  </NavLink>
                </li>
                <li
                  onClick={() => {
                    setSearchResult(false);
                    setSearch("");
                    setTurnSet(false);
                    setTurnNoti(false);
                  }}
                >
                  <Logout />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Login */}
        {localStorage.getItem("user") ? (
          <img
            className="rounded-circle mr-2"
            width={50}
            height={50}
            src={user && user.avatar}
            alt="avatar"
          />
        ) : (
          <div className={styles.login}>
            <button onClick={_clickLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
