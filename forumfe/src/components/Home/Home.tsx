import React from 'react'
import styles from "./Home.module.css"

export default function Home() {
    return (
        <div>

            <div className={styles.module}>
                <div className={styles.banner}>
                    <img src={require("./images/forums-icon.png")} alt="" />
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
                            <div>
                                <label htmlFor="search">Search Post</label>
                                <input type="text" id='search' name='search' value="" />
                                <button className={styles.button_search}>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
