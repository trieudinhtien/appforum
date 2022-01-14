import { FC } from "react";
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

  const handleBack = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < Math.ceil(max / amount)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Pagination className={styles.myposts_pagination}>
      <li onClick={handleBack}>
        <a className={`page-link`}>{"<"}</a>
      </li>
      <li onClick={handleNext}>
        <a className={`page-link`}>{">"}</a>
      </li>
    </Pagination>
  );
};

export default MyPostPagination;
