import css from './ArrowBtn.module.css';
import { Link } from 'react-router-dom';

function ArrowBtn({ to, ariaLabel = 'Go' }) {
  return (
    <div className={css.arrowBtnLink}>
      <Link to={to} aria-label={ariaLabel}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </Link>
    </div>
  );
}

export default ArrowBtn;
