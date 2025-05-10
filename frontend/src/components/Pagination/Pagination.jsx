import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = event => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      pageClassName={styles.pageButton}
      pageLinkClassName={styles.pageButton}
      activeClassName={styles.active}
      breakClassName={styles.pageButton}
      breakLinkClassName={styles.pageButton}
      previousLabel={null}
      nextLabel={null}
    />
  );
};

export default Pagination;
