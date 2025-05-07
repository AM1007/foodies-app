import styles from './RecipePagination.module.css';

const RecipePagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`${styles.pageButton} ${
            currentPage === number ? styles.active : ''
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default RecipePagination;
