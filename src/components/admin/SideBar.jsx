import styles from './Dashboard.module.css'

export const SideBar = () => {
  return (
    <>
      <div className={styles.contenedorSidebar}>
        <a href="#">
          <img
            src="src/assets/img/logos/Logo_sinfondo.png"
            width="180"
            height="100"
          />
        </a>
        <h2>Menú Admin</h2>
        <button className={styles.btnAdmin}>Listar Hojas de vida</button>
        <button className={styles.btnAdmin}>Agregar área de ocupación</button>
        <button className={styles.btnAdmin}>Agregar tipo de área de ocupación</button>
        <button className={styles.btnAdmin}>Agregar aptitudes</button>
      </div>
    </>
  );
};
