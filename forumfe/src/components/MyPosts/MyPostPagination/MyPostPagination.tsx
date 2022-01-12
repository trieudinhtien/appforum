import { FC } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./MyPostPagination.module.css";

const MyPostPagination: FC<{}> = () => {
  return (
    <Pagination className={styles.myposts_pagination}>
      <li>
        <a className={`page-link`}>{"<"}</a>
      </li>
      <li>
        <a className={`page-link`}>{1}</a>
      </li>
      <li>
        <a className={`page-link ${styles.active}`}>{2}</a>
      </li>
      <li>
        <a className={`page-link`}>{3}</a>
      </li>
      <li>
        <a className={`page-link`}>{4}</a>
      </li>
      <li>
        <a className={`page-link`}>{5}</a>
      </li>
      <li>
        <a className={`page-link`}>{6}</a>
      </li>
      <li>
        <a className={`page-link`}>{">"}</a>
      </li>

      {/* <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item className={styles.active}>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item>{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>
      <Pagination.Item>{6}</Pagination.Item>

      <Pagination.Item>{">"}</Pagination.Item> */}
    </Pagination>
  );
};

export default MyPostPagination;
