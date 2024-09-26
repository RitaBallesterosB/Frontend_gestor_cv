import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const CvRegistrada = () => {
  const { auth } = useAuth();
  const [cvData, setCvData] = useState(null);

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
              "Authorization": token, // Asegúrate de que el formato sea correcto
            },
          });
      
          if (!response.ok) {
            throw new Error("Error al obtener la hoja de vida registrada");
          }
      
          const data = await response.json();
          setCvData(data);
        } catch (error) {
          console.error("Error al obtener la hoja de vida registrada:", error);
        }
      };
    fetchCvData();
  }, []);

  if (!cvData) {
    return (
      <>
        <HeaderPriv />
        <div className={styles.contenedorCv}>
          <h1>Cargando...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Hoja de vida registrada</h1>
        <div className={styles.subContenedorCv}>
          <h3>Información registrada</h3>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <strong>Nombre:</strong> {cvData.nombre_usuario} {cvData.apellido_usuario}
            </div>
            <div className={styles.infoItem}>
              <strong>Correo electrónico:</strong> {cvData.correo_electronico}
            </div>
            <div className={styles.infoItem}>
              <strong>Celular:</strong> {cvData.celular}
            </div>
            <div className={styles.infoItem}>
              <strong>Tipo de documento:</strong> {cvData.tipo_documento}
            </div>
            <div className={styles.infoItem}>
              <strong>Número de documento:</strong> {cvData.numero_dto}
            </div>
            <div className={styles.infoItem}>
              <strong>Bio:</strong> {cvData.bio}
            </div>
            <div className={styles.infoItem}>
              <strong>Ocupación:</strong> {cvData.ocupacion}
            </div>
            <div className={styles.infoItem}>
              <strong>Municipio de residencia:</strong> {cvData.region_residencia}
            </div>
            <div className={styles.infoItem}>
              <strong>Tiempo de experiencia:</strong> {cvData.tiempo_experiencia} años
            </div>
            <div className={styles.infoItem}>
              <strong>Área de ocupación:</strong> {cvData.area_ocupacion}
            </div>
            <div className={styles.infoItem}>
              <strong>Tipo de ocupación:</strong> {cvData.tipo_area_ocupacion}
            </div>
            <div className={styles.infoItem}>
  <strong>Aptitudes:</strong> {Array.isArray(cvData.aptitudes) ? cvData.aptitudes.join(", ") : "No especificado"}
</div>

          </div>
        </div>
      </div>
    </>
  );
};
