import NavAdmin from "./NavAdmin";
import styles from "./Dashboard.module.css";

export const HeaderAdmin = () => {
  return (
    <header>
      <div className={styles.headerAdmin}>
        {/* Aquí integramos el NavPriv en el Header */}
        <NavAdmin />
      </div>
    </header>
  );
};
