import css from './ArrowBtn.module.css';
import { Link } from 'react-router-dom';

function ArrowBtn({ to, ariaLabel = 'Go', onClick }) {
  return (
    <div className={css.arrowBtnLink}>
      <Link to={to} aria-label={ariaLabel} onClick={onClick}>
        <svg
          className={css.icon}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.334 22.666L22.667 9.333M9.334 9.333h13.333v13.333"
            stroke="currentColor"
            strokeWidth="2.6"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </div>
  );
}

export default ArrowBtn;
