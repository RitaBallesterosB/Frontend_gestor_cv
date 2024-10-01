import { useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";

export const ResultadosBuscador = ({ results }) => {
  const handleCardClick = (id) => {
    <Link to={`/user-data/${id}`}>
      <div className={styles.btCard}>Ver más</div>
    </Link>;
  };

  return (
    <div className={styles.contBusquedaResul}>
      <h2>Resultados de Búsqueda: {results.length}</h2>
      {results && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Área de Ocupación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item._id}>
                <td>{item.nombre_usuario}</td>
                <td>{item.apellido_usuario}</td>
                <td>{item.area_ocupacion.nombre}</td>
                <td>
                 <Link
                    to={`/user-data/${item._id}`}
                    className={styles.boton}
                    onCli ck={() => handleCardClick(item._id)}
                  >
                    Ver más
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};
