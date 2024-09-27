import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatar from '../../../assets/img/default.png';
import styles from './Private.module.css';

const NavPriv = () => {
  const { auth } = useAuth();
  // Asumimos que auth tiene la siguiente estructura
  // { token, nombre, apellido, imagen_perfil, initials }

  const profileImage = auth.imagen_perfil && auth.imagen_perfil !== "default.png"
    ? auth.imagen_perfil
    : avatar;

  return (
    <nav className={styles.navpriv}>
      <ul className={styles.navmenu}>
        <li>
          <NavLink to="/cv-registrada" activeClassName={styles.active}>
            Ver Datos CV Registrada
          </NavLink>
        </li>
        <li>
          <NavLink to="/cv-modificada" activeClassName={styles.active}>
            Modificar los datos del CV
          </NavLink>
        </li>
      </ul>

      <div className={styles.navRight}>
      <span className={styles.userinitials}>{auth.initials}</span>
        <img
          src={profileImage}
          className={styles.userphoto}
          alt="Foto de perfil"
        />
        <span className={styles.username}>{`${auth.nombre} ${auth.apellido}`}</span>
        
      </div>
    </nav>
  );
};

export default NavPriv;
