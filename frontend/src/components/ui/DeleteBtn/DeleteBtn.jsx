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
      <svg
        className={css.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="currentColor"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.667"
          d="M12 4h8M4 8h24m-2.667 0l-.935 14.026c-.14 2.104-.21 3.156-.665 3.954a4.007 4.007 0 0 1-1.731 1.62c-.826.4-1.881.4-3.99.4h-4.025c-2.109 0-3.163 0-3.99-.4a4.001 4.001 0 0 1-1.731-1.62c-.455-.798-.525-1.85-.665-3.954L6.666 8"
          fill="none"
        />
      </svg>
    </button>
  );
}

export default DeleteBtn;
