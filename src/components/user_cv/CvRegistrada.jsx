import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";

export const CvRegistrada = () => {
  const [cvData, setCvData] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no disponible");
        }

        const response = await fetch(Global.url + "user/ver-cv-registrado", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la hoja de vida registrada");
        }

        const data = await response.json();
        setCvData(data);

        // Verificar el estado del CV después de obtener los datos
        if (data.cvData && !data.cvData.estado) { // Asegúrate de que "estado" sea la propiedad correcta
          navigate('/reactivar-cv'); // Redirigir a la página de reactivación si el CV está desactivado
        }
      } catch (error) {
        console.error("Error al obtener la hoja de vida registrada:", error);
      }
    };

    fetchCvData();
  }, [navigate]); // Asegúrate de incluir navigate en las dependencias

  const handleDesactivarCv = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await fetch(Global.url + "user/desactivar-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Error al desactivar la hoja de vida");
      }

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Hoja de vida desactivada con éxito',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        // Redirigir a la página de reactivación después de que el usuario haga clic en "Aceptar"
        navigate('/reactivar-cv');
      });

      setCvData(null);
    } catch (error) {
      console.error("Error al desactivar la hoja de vida:", error);
    }
  };

  if (!cvData || !cvData.cvData) {
    return (
      <>
        <HeaderPriv />
        <div className={styles.contenedorCv}>
          <h1>Cargando...</h1>
        </div>
      </>
    );
  }

  const {
    nombre_usuario,
    apellido_usuario,
    correo_usuario,
    segundo_nombre,
    segundo_apellido,
    celular,
    tipo_documento,
    numero_dto,
    bio,
    ocupacion,
    region_residencia,
    tiempo_experiencia,
    area_ocupacion,
    tipo_area_ocupacion,
    aptitudes,
    estado, // Asegúrate de que esta propiedad esté presente
  } = cvData.cvData;

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Hoja de vida registrada</h1>
        <div className={styles.subContenedorCv}>
          <h3>Información registrada</h3>
          <div className={styles.formCv}>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Primer nombre</label>
                <input value={nombre_usuario} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Primer apellido</label>
                <input value={apellido_usuario} disabled={true} />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Segundo nombre</label>
                <input value={segundo_nombre} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Segundo apellido</label>
                <input value={segundo_apellido} disabled={true} />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Correo electrónico</label>
                <input value={correo_usuario} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Tipo de documento</label>
                <input value={tipo_documento} disabled={true} />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Celular</label>
                <input value={celular} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Número de documento</label>
                <input value={numero_dto} disabled={true} />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Bio</label>
                <input value={bio} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Ocupación</label>
                <input value={ocupacion} disabled={true} />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Municipio de residencia</label>
                <input value={region_residencia} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Tiempo de experiencia</label>
                <input value={tiempo_experiencia + " años"} disabled={true} />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Área de ocupación</label>
                <input value={area_ocupacion.nombre} disabled={true} />
              </div>
              <div className={styles.input}>
                <label>Tipo de ocupación</label>
                <input value={tipo_area_ocupacion.nombre} disabled={true} />
              </div>
            </div>
            <div className={styles.input}>
              <strong>Aptitudes</strong>
              {Array.isArray(aptitudes) && aptitudes.length > 0 ? (
                <ul className={styles.aptitudesList}>
                  {aptitudes.map((apt, index) => (
                    <li key={index}>{apt.nombre}</li>
                  ))}
                </ul>
              ) : (
                "No especificado"
              )}
            </div>
            <button type="submit" className={styles.btnSubmit} onClick={handleDesactivarCv}>
              Desactivar hoja de vida
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
