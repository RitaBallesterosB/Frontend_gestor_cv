import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/default.png";
import styles from "./Dashboard.module.css";

const NavAdmin = () => {
  const { auth } = useAuth();
  // Asumimos que auth tiene la siguiente estructura
  // { token, nombre, apellido, imagen_perfil, initials }

  const profileImage =
    auth.imagen_perfil && auth.imagen_perfil !== "default.png"
      ? auth.imagen_perfil
      : avatar;

  return (
    <div className={styles.headerpriv}>
      <nav className={styles.navpriv}>
        <div className={styles.navRight}>
          <span className={styles.userinitials}>{auth.initials}</span>

          <span className={styles.username}>
            Bienvenido {`${auth.nombre} ${auth.apellido}`}
          </span>
          <div>
            <img
              src={profileImage}
              className={styles.userphoto}
              alt="Foto de perfil"
            />
          </div>
          <div>
            <NavLink to="/logout" className={styles.boton}>
              <span>Cerrar sesión</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavAdmin;
