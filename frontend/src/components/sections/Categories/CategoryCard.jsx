import { ArrowRight } from 'lucide-react';
import styles from './Categories.module.css';

const CategoryCard = ({ name, img, onClick }) => (
  <div className={styles.card}>
    <img src={img} alt={name} className={styles.image} />
    <div className={styles.overlay}>
      <span className={styles.label}>{name}</span>
      <button className={styles.button} onClick={onClick}>
        <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

export default CategoryCard;
