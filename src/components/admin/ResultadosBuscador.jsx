import { useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";

export const ResultadosBuscador = ({ results }) => {
  const handleCardClick = (id) => {
    // Redirect to the vehicle's detail page using the id
    // For example, using react-router-dom:
    <Link to={`/cv-registrada/${id}`}>
      <div className={styles.btCard}>Ver más</div>
    </Link>;
  };

  return (
    <div className={styles.contBusquedaResul}>
      <h2>Resultados de Búsqueda: {results.length}</h2>
      {results && (
        <div className={styles.home}>
          {results.map((item) => (
            // <li key={item.id}>{item.nombre}</li> // Ejemplo de renderización de items
            <div className={styles.card} key={item._id}>
              <span className={styles.datos}>
                <img
                  className={styles.fotoPerfil}
                  src={item.imagen_perfil || avatar} // Aquí podrías usar una imagen del usuario si está disponible
                  alt="foto de perfil"
                />
              </span>
              <span className={styles.datos}>
                <h2>Nombre: {item.nombre}</h2> {/* Accede a 'nombre_usuario' */}
                <h2>Apellido: {item.apellido}</h2>{" "}
                {/* Accede a 'apellido_usuario' */}
                <h2>Correo Electrónico: {item.correo_electronico}</h2>{" "}
                {/* Si tienes ocupación, cámbialo aquí */}
                <div className={styles.contLink}>
                  <Link
                    to={`/cv-registrada/${item._id}`}
                    className={styles.boton}
                    onClick={() => handleCardClick(item._id)}
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
