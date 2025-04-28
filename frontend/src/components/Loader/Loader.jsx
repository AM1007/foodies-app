import { CircleLoader } from 'react-spinners';
import styles from './Loader.module.css';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Loader = () => {
  const loading = true;
  const color = '#36d7b7';

  return (
    <div className={styles.loaderContainer}>
      <CircleLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
