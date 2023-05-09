import React, { FC } from "react";
import styles from "./Paginate.module.scss";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import { ArrowIcon } from "src/assets/icons";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type PaginateProps = {
  pageCount: number;
  forcePage?: number;
  onPageChange?: ({ selected }: { selected: number }) => void;
  currentPage: number;
};

const Paginate: FC<PaginateProps> = ({
  pageCount,
  forcePage,
  onPageChange,
  currentPage,
}) => {
  const { theme } = useThemeContext();
  const isLight = theme === Theme.Light;
  return (
    <ReactPaginate
      nextLabel={<ArrowIcon />}
      previousLabel={<ArrowIcon />}
      pageCount={pageCount}
      forcePage={forcePage}
      onPageChange={onPageChange}
      containerClassName={styles.pagesContainer}
      pageClassName={styles.pageNumber}
      breakClassName={styles.pageNumber}
      breakLinkClassName={styles.linkPage}
      activeLinkClassName={styles.linkPage}
      pageLinkClassName={styles.linkPage}
      activeClassName={styles.activePageNumber}
      nextClassName={classNames(styles.arrowButton, {
        [styles.blockedButtonPosts]: currentPage === pageCount,
        [styles.arrowButtonLight]: isLight,
      })}
      previousClassName={classNames(styles.arrowButton, {
        [styles.blockedButtonPosts]: currentPage === 1,
        [styles.arrowButtonLight]: isLight,
      })}
      previousLinkClassName={styles.linkPage}
      nextLinkClassName={styles.linkPage}
    />
  );
};

export default Paginate;
