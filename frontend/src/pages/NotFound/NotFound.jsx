import css from './NotFound.module.css';
import { Link } from 'react-router-dom';
import imageNotFound from '../../icons/imageNotFound.svg';
import Button from '../../components/Button/Button';

const NotFound = () => {
  return (
    <div>
      <img className={css.imageNotFound} src={imageNotFound} alt="Not found" />
      <Link to={`/`}>{/* <Button>Home Page</Button> */}</Link>
    </div>
  );
};

export default NotFound;
