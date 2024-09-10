import { HeaderPub } from "../layouts/public/HeaderPub";
import styles from "./Register.module.css";

export const Register = () => {
  return (
    <>
      <HeaderPub />
      <div className={styles.contenedorRegister}>
        <h1>Crear cuenta</h1>
        <div className={styles.subcontenedor}>
          <div>
            <h4>
              ¿Ya eres un usuario registrado?
              <a href="#">Por favor iniciar sesión</a>
            </h4>
            <p>
              Para continuar, debes tener en cuenta que todos los campos del
              formulario con * son obligatorios para crear una cuenta.
            </p>
          </div>
          <div>
            <form className={styles.formRegister}>
              <label htmlFor="name">Nombre*:</label>
              <input type="text" name="name" required />
              <label htmlFor="last_name">Apellido*:</label>
              <input type="text" name="last_name" required />
              <label htmlFor="email">Correo electrónico*:</label>
              <input type="email" name="email" required />
              <label htmlFor="password">Contraseña*:</label>
              <input type="password" name="password" required />
              <label htmlFor="confirm_password">Confirmar Contraseña*:</label>
              <input type="password" name="confirm_password" required />
              <input type="submit" value="Registrarse" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
