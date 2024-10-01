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
            <div className={styles.card} key={item._id}>
              <span className={styles.datos}>
                <img
                  className={styles.fotoPerfil}
                  src={item.imagen_perfil || avatar} // Aquí podrías usar una imagen del usuario si está disponible
                  alt="foto de perfil"
                />
              </span>
              <span className={styles.datos}>
                <h2>Nombre: {item.nombre_usuario}</h2>{" "}
                {/* Accede a 'nombre_usuario' */}
                <h2>Apellido: {item.apellido_usuario}</h2>{" "}
                {/* Accede a 'apellido_usuario' */}
                <h2>Área ocupación: {item.area_ocupacion.nombre}</h2>{" "}
                {/* Si tienes ocupación, cámbialo aquí */}
                <div className={styles.contLink}>
                  <Link
                    to={`/ver-cv-registrada/${item._id}`}
                    className={styles.boton}
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
