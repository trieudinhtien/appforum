import { FC, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./MyPostPagination.module.css";

interface MyPostPaginationProps {
  currentPage: number;
  setCurrentPage(currentPage: number): void;
  maxPage: number;
  amount: number;
}

const MyPostPagination: FC<MyPostPaginationProps> = ({
  currentPage,
  setCurrentPage,
  maxPage,
  amount,
}) => {
  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  const handleBack = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage < Math.min(...pages) + 1) {
        const pageList = [...pages];
        pageList.unshift(currentPage - 1);
        pageList.pop();
        setPages(pageList);
      }
    }
  };

  const handleNext = (): void => {
    if (currentPage < Math.floor(maxPage / amount) + 1) {
      setCurrentPage(currentPage + 1);
      if (currentPage > Math.max(...pages) - 1) {
        const pageList = [...pages];
        pageList.push(currentPage + 1);
        pageList.shift();
        setPages(pageList);
      }
    }
  };

  const handleSetCurrentPage = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <Pagination className={styles.myposts_pagination}>
      <li onClick={handleBack}>
        <a className={`page-link`}>{"<"}</a>
      </li>
      {/* <li>
        <a className={`page-link`}>{1}</a>
      </li>
      <li>
        <a className={`page-link ${styles.active}`}>{2}</a>
      </li>
      <li>
        <a className={`page-link`} onClick={e => handleSetCurrentPage(3)}>{3}</a>
      </li>
      <li>
        <a className={`page-link`}>{4}</a>
      </li>
      <li>
        <a className={`page-link`}>{5}</a>
      </li>
      <li>
        <a className={`page-link`}>{6}</a>
      </li> */}
      {pages.map((item: number) => {
        return (
          <li key={item}>
            <a
              className={
                item === currentPage
                  ? `page-link ${styles.active}`
                  : `page-link`
              }
              onClick={(e) => handleSetCurrentPage(item)}
            >
              {item}
            </a>
          </li>
        );
      })}
      <li onClick={handleNext}>
        <a className={`page-link`}>{">"}</a>
      </li>
    </Pagination>
  );
};

export default MyPostPagination;
