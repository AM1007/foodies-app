import styles from './RecipeTitleInput.module.css';

const RecipeTitleInput = ({ register, value, error }) => {
  return (
    <div className={styles.formGroup}>
      <div
        className={`${styles.nameWrapper} ${
          error ? styles.errorInput : ''
        }`}
      >
        <textarea
          className={styles.nameLabel}
          placeholder="The name of the recipe"
          maxLength={200}
          {...register}
        />
        <span className={styles.charCountTitle}>{value?.length || 0}</span>
      </div>
      {error && (
        <p className={styles.errorMessage}>{error}</p>
      )}
    </div>
  );
};

export default RecipeTitleInput;