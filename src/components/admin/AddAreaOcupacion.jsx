import { useState } from "react";
import Swal from "sweetalert2";  // SweetAlert
import styles from "./Dashboard.module.css"; 
import { HeaderAdmin } from "./HeaderAdmin";
import { SideBar } from "./SideBar";
import { Link } from "react-router-dom";



export const AddAreaOcupacion = () => {
  const [nombreArea, setNombreArea] = useState(""); // Estado para controlar el nombre del área

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página recargue

    try {
      const token = localStorage.getItem("token"); // Obtener el token desde el localStorage
      console.log("Token:", token); // Verificar que el token exista
      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await fetch("http://localhost:3900/api/admin/area-ocupacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Autorización con el token
        },
        body: JSON.stringify({ nombre: nombreArea }), // Enviar el nombre del área en el cuerpo de la petición
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar el área de ocupación: ${errorText}`);
      }

      const data = await response.json(); // Manejar la respuesta
      console.log(data);

      // Mostrar alerta de éxito utilizando SweetAlert
      Swal.fire({
        icon: "success",
        title: "Área de ocupación agregada exitosamente",
        showConfirmButton: true,
        timer: 1500,
      });

    } catch (error) {
      console.error("Error al agregar el área de ocupación:", error);

      // Mostrar alerta de error en caso de fallo
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <HeaderAdmin />

      <SideBar />

      <div className={styles.addAreaOcupacionContainer}>
        <h2>Agregar área de ocupación</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="nombreArea">Nombre del área:</label>
            <input
              type="text"
              id="nombreArea"
              name="nombreArea"
              value={nombreArea}
              onChange={(e) => setNombreArea(e.target.value)} // Actualizar el estado con el valor del input
              required
            />
          </div>
          <button type="submit" className={styles.btnAdmin}>
            Agregar área Ocupacion
          </button>

          <div>
            <Link to={`/admin`} className={styles.boton}>
              Volver al Buscador
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  );
};
