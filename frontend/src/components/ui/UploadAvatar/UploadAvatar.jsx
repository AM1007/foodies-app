import css from './UploadAvatar.module.css';
import icons from '../../../icons/sprite.svg';

function UploadAvatar({ onClick, className = '' }) {
  return (
    <div className={`${css.uploadIcon} ${className}`} onClick={onClick}>
      <svg className={css.icon}>
        <use href={`${icons}#plus`} />
      </svg>
    </div>
  );
}

export default UploadAvatar;
