import { useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";

export const ResultadosBuscador = ({ results }) => {
  return (
    <div className={styles.contBusquedaResul}>
      <h2>Resultados de Búsqueda: {results.length}</h2>
      {results && (
        <div className={styles.home}>
          {results.map((item) => (
            <div className={styles.cardResults} key={item._id}>
              <span className={styles.datos}>
                <div className={styles.datosCard}>
                  <h2>Nombre: {item.nombre_usuario}</h2>{" "}
                  {/* Accede a 'nombre_usuario' */}
                  <h2>Apellido: {item.apellido_usuario}</h2>{" "}
                  {/* Accede a 'apellido_usuario' */}
                </div>
                <h2>Área ocupación: {item.area_ocupacion.nombre}</h2>{" "}
                {/* Si tienes ocupación, cámbialo aquí */}
                <h2>Tipo área ocupación: {item.tipo_area_ocupacion.nombre}</h2>
                <h2>
                  Tipo de documento: {item.tipo_documento} - Número:{" "}
                  {item.numero_dto}
                </h2>
                <div className={styles.contLink}>
                  <Link
                    to={`/ver-cv-registrada/${item._id}`}
                    className={styles.botonResults}
                  >
                    Ver más
                  </Link>
                </div>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
