import styles from './Dashboard.module.css'
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className={styles.contenedorPrincipal}>
      <div className={styles.contenedorSidebar}>
        <h2>Menú Admin</h2>
        <NavLink to="/listar-cv" className={styles.btnAdmin}>
            Listar hojas de vida
          </NavLink>
        <button className={styles.btnAdmin}>Agregar área de ocupación</button>
        <button className={styles.btnAdmin}>Agregar tipo de área de ocupación</button>
        <button className={styles.btnAdmin}>Agregar aptitudes</button>
      </div>
    </div>
  );
};
