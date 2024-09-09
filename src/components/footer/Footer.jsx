import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logoCopy}>
        <i className="fa-solid fa-user-group"></i>
        <span className={styles.copyRigth}>©2024 RR.HH</span>
      </div>
    </div>
  );
};
