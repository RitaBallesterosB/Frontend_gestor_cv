import styles from './Dashboard.module.css'
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className={styles.contenedorPrincipal}>
      
      <a href="#">
          <img
            src="src/assets/img/logos/Logo_sinfondo.png"
            width="180"
            height="100"
          />
        </a>
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
