import { FC } from "react";
import styles from "./MyPostItem.module.css";

const MyPostItem: FC<{}> = () => {
    return(
        <div className={styles.mypost_item}>
            <div>
                <div className={styles.mypost_item_title}>Bebop Publishing will release a limited edition of "Justice"</div>
                <div className={styles.mypost_item_user}>Created 5 hours ago</div>
            </div>
            <div>10</div>
            <div>10</div>
            <div>Noice</div>
        </div>
    )
}

export default MyPostItem;