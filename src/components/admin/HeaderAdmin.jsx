import NavAdmin from "./NavAdmin";
import styles from './Dashboard.module.css';

export const HeaderAdmin = () => {
  return (
    <header>
      
      <div className={styles.headerAdmin}>
      <a href="#">
          <img
            src="src/assets/img/logos/Logo_sinfondo.png"
            width="180"
            height="100"
          />
        </a>
        {/* Aquí integramos el NavPriv en el Header */}
        <NavAdmin />
      </div>
    </header>
  );
};