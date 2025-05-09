import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import imageNotFound from '../../icons/imageNotFound.svg';

const NotFound = () => {
  return (
    <div className={`container ${styles.wrapper}`}>
      <img className={styles.image} src={imageNotFound} alt="Not found" />
      <Link to={`/`}></Link>
    </div>
  );
};

export default NotFound;
