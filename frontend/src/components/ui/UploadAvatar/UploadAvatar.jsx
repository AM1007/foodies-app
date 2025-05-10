import css from './UploadAvatar.module.css';

function UploadAvatar({ onClick, className = '' }) {
  return (
    <div className={`${css.uploadIcon} ${className}`} onClick={onClick}>
      <svg
        className={css.icon}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3.33337V12.6667M3.33398 8H12.6673"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default UploadAvatar;
