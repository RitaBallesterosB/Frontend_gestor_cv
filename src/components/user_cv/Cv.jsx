import styles from "./Cv.module.css";

export const Cv = () => {
  return (
    <>
      <h1>Hoja de vida</h1>
      <h3>Los campos con * son obligatorios</h3>
      <form>
        <label htmlFor="first_name">Primer nombre:</label>
        <input type="name" name="first_name" />
        <label htmlFor="second_name">Segundo nombre:</label>
        <input type="name" name="second_name" />
        <label htmlFor="first_last_name">Primer apellido:</label>
        <input type="last_name" name="first_last_name" />
        <label htmlFor="second_last_name">Segundo apellido:</label>
        <input type="last_name" name="second_last_name" />
        <label htmlFor="phone">Celular*:</label>
        <input type="number" name="phone" />
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" name="email" />
      </form>
    </>
  );
};
