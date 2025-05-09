import css from './DeleteBtn.module.css';

function DeleteBtn({ onClick, ariaLabel = 'Delete recipe', disabled = false }) {
  return (
    <button
      type="button"
      className={`${css.deleteBtn} ${disabled ? css.disabled : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <svg viewBox="0 0 24 20" fill="none">
        <path
          d="M3 6h18M8 6V4h8v2m1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}

export default DeleteBtn;
