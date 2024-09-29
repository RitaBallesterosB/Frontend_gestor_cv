import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";

const Card = () => {
  return (
    <div className={styles.home}>
      <div className={styles.card}>
        <span className={styles.datos}>
          <img
            className={styles.fotoPerfil}
            src={avatar}
            alt="foto de perfil "
          />
        </span>
        <span className={styles.datos}>
          <h2>Nombre</h2>
          <h2>Apellido</h2>
		  <h2>Ocupación</h2>
          <div className={styles.contLink}>
            <Link className={styles.boton}>Ver más</Link>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Card;
