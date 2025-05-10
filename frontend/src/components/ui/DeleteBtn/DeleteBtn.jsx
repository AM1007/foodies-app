import css from './DeleteBtn.module.css';
import icons from '../../../icons/sprite.svg';

function DeleteBtn({ onClick, ariaLabel = 'Delete recipe', disabled = false }) {
  return (
    <button
      type="button"
      className={`${css.deleteBtn} ${disabled ? css.disabled : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <svg className={css.icon}>
        <use href={`${icons}#trash`} />
      </svg>
    </button>
  );
}

export default DeleteBtn;
