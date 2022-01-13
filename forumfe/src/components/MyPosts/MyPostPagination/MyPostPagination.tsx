import { FC, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import styles from "./MyPostPagination.module.css";

interface MyPostPaginationProps {
  currentPage: number;
  setCurrentPage(currentPage: number): void;
  max: number;
  amount: number;
}

const MyPostPagination: FC<MyPostPaginationProps> = ({
  currentPage,
  setCurrentPage,
  max,
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
    if (currentPage < Math.floor(max / amount) + 1) {
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
      {pages.map((item: number) => {
        return (
          <li key={item} className="d-none">
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
