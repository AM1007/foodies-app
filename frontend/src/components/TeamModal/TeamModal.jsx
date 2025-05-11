import styles from './TeamModal.module.css';
// import sprite from '../../assets/sprite.svg';
import teamMembers from '../../data/teamMembers';
import Modal from '../Modal/Modal';

const TeamModal = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={styles.wrapper}>
        <button className={styles.closeBtn} type="button" onClick={onClose}>
          {/* <svg className={styles.closeIcon} width="20" height="20">
            <use href={`${sprite}#icon-cross-closed`} />
          </svg> */}
        </button>
        <h2 className={styles.title}>DEV TITANS TEAM</h2>
        <ul className={styles.list}>
          {teamMembers.map(({ name, role, img, img2x, linkedin, github }) => (
            <li key={name} className={styles.item}>
              <div className={styles.wrap}>
                <img
                  className={styles.img}
                  loading="lazy"
                  src={img}
                  srcSet={`${img2x} 2x`}
                  alt={name}
                />
              </div>
              {/* <div className={styles.box}>
                <h2 className={styles.member}>{name}</h2>
                <p className={styles.role}>{role}</p>
                <a
                  className={styles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={linkedin}
                >
                  <svg className={styles.icon} width="25" height="25">
                    <use href={`${sprite}#icon-linkedin`} />
                  </svg>
                </a>
                <a
                  className={styles.github}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={github}
                >
                  <svg className={styles.icon} width="25" height="25">
                    <use href={`${sprite}#icon-github`} />
                  </svg>
                </a>
              </div> */}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default TeamModal;
