import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useState } from "react";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export const ReactivarCv = () => {
  const [isCvActive, setIsCvActive] = useState(true); // Estado local para el estado del CV
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleReactivarCv = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(Global.url + "user/reactivar-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });

      if (!response.ok) {
        throw new Error("Error al reactivar la hoja de vida");
      }

      setIsCvActive(true); // Cambiar el estado a activo
      Swal.fire({
        icon: 'success',
        title: 'Reactivada',
        text: 'Hoja de vida reactivada con éxito',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        navigate(-1); // Redirigir a la página anterior
      });
    } catch (error) {
      console.error("Error al reactivar la hoja de vida:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al reactivar la hoja de vida',
      });
    }
  };

  return (
    <div>
      <HeaderPriv />
      <h1>Si desesa ver o modificar su hoja de vida registrada debe reactivarla nuevamente </h1>
      <button onClick={handleReactivarCv} type="submit" className={styles.btnSubmit}>
        Reactivar hoja de vida
      </button>
    </div>
  );
};
