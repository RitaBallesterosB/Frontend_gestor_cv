import NavPriv from "./NavPriv";
import styles from './Private.module.css';

export const HeaderPriv = () => {
  return (
    <header>
      <div className={styles.headerpriv}>
        <a href='#' className={styles.logocontainer}>
          <img src='src/assets/img/logos/Logo_sinfondo.png' width="160" height="80" />
        </a>
        {/* Aquí integramos el NavPriv en el Header */}
        <NavPriv />
      </div>
    </header>
  );
};