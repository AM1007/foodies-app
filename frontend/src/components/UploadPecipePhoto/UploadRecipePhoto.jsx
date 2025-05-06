import { useState } from 'react';
import styles from './UploadRecipePhoto.module.css';
import icons from '../../icons/sprite.svg';

const PhotoUploader = ({ onPhotoChange, error }) => {
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onPhotoChange(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={styles.photoUpload}>
        {photoPreview ? (
          <div className={styles.uploadedPhoto}>
            <img src={photoPreview} alt="Recipe" className={styles.recipeImage} />
          </div>
        ) : (
          <div className={styles.uploadPlaceholder}>
            <svg className={styles.cameraIcon} fill="none">
              <use href={`${icons}#camera`} />
            </svg>
            <p className={styles.uploadText}>Upload a photo</p>
            <input
              type="file"
              className={styles.fileInput}
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </div>
        )}
      </div>
      
      {!photoPreview && error && <p className={styles.errorMessage}>{error}</p>}

      {photoPreview && (
        <label className={styles.uploadAnotherBtn}>
          Upload another photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className={styles.hiddenFileInput}
          />
        </label>
      )}
    </div>
  );
};

export default PhotoUploader;