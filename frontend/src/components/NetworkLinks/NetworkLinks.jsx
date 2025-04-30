import links from '../../data/socialLinks';
import styles from './NetworkLinks.module.css';

const NetworkLinks = () => {
  return (
    <ul className={styles.socialList}>
      {links.map(({ href, icon, label }) => (
        <li key={icon}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.socialLink}
          >
            <svg>
              <use href={icon} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NetworkLinks;
