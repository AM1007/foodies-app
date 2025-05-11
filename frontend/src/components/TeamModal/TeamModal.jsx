import styles from './TeamModal.module.css';
import sprite from '../../icons/sprite.svg';
import teamMembers from '../../data/teamMembers';
import Modal from '../Modal/Modal';

const TeamModal = ({ onClose }) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      modalClassName={styles.customModal}
      overlayClassName={styles.overlayScroll}
    >
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Space Raccoons Team</h2>
        <ul className={styles.list}>
          {teamMembers.map(({ name, role, img, linkedin, github }) => (
            <li key={name} className={styles.item}>
              <div className={styles.wrap}>
                <img
                  className={styles.img}
                  loading="lazy"
                  src={img}
                  alt={name}
                />
                <div className={styles.box}>
                  <h2 className={styles.member}>{name}</h2>
                  <p className={styles.role}>{role}</p>
                  <div className={styles.socials}>
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
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default TeamModal;
