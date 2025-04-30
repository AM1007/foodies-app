import css from './DeleteBtn.module.css';

function DeleteBtn({ to, ariaLabel = 'Go' }) {
  return (
    <div className={css.deleteBtn}>
      <button
        type="button"
        className={css.recipePreviewCardDelete}
        // onClick={handleDelete}
        aria-label="Видалити рецепт"
      >
        <svg viewBox="0 0 24 20" fill="none">
          <path
            d="M3 6h18M8 6V4h8v2m1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6h10z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}

export default DeleteBtn;
