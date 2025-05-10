import styles from './NotFound.module.css';
import imageNotFound from '../../icons/imageNotFound.svg';
import Loader from '../../components/Loader/Loader';

const NotFound = () => {
  return (
    <div className={`container ${styles.wrapper}`}>
      <img className={styles.image} src={imageNotFound} alt="Not found" />
    </div>
  );
};

export default NotFound;
