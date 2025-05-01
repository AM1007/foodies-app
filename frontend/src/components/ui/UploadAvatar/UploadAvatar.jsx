import { FaPlus } from 'react-icons/fa';
import css from './UploadAvatar.module.css';

function UploadAvatar({ onClick, className = '' }) {
  return (
    <div className={`${css.uploadIcon} ${className}`} onClick={onClick}>
      <FaPlus className={css.icon} />
    </div>
  );
}

export default UploadAvatar;
