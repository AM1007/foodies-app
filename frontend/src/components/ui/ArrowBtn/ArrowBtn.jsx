import css from './ArrowBtn.module.css';
import { Link } from 'react-router-dom';
import icons from '../../../icons/sprite.svg';

function ArrowBtn({ to, ariaLabel = 'Go', onClick }) {
  return (
    <div className={css.arrowBtnLink}>
      <Link to={to} aria-label={ariaLabel} onClick={onClick}>
        <svg className={css.icon}>
          <use href={`${icons}#arrow-up-right`} />
        </svg>
      </Link>
    </div>
  );
}

export default ArrowBtn;
