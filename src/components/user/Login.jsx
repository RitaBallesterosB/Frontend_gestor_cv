import { HeaderPub } from "../layouts/public/HeaderPub";
import styles from "./Login.module.css";

export const Login = () => {
  return (
    <>
      <HeaderPub />
      <div className={styles.contenedorLogin}>
        <div className={styles.login}>
          <h2>Bienvenido a RR.HH Tu gestor de hoja de vida de confianza</h2>
          <p>
            Para continuar, debe completar los campos a continuación para poder
            iniciar sesión
          </p>
          <form className={styles.form}>
            <label htmlFor="email">Correo elelctrónico</label>
            <input type="email" id="email" />
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" />
            <a href="#">¿Olvidaste tu Contraseña?</a>
            <button type="submit"> Iniciar sesión</button>
          </form>
          <p>¿Aún no eres un usuario registrado?</p>
          <a href="#">Registrarse</a>
        </div>
      </div>
    </>
  );
};
