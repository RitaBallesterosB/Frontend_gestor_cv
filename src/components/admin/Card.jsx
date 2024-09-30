import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";
import { Global } from "../../helpers/Global";

const Card = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Verificar token
        if (!token) {
          throw new Error("Token no disponible");
        }

        const apiUrl = Global.url + "admin/listar-all-users";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error al obtener los usuarios registrados: ${errorText}`);
        }

        const data = await response.json();
        setCardData(data)

      } catch (error) {
        console.error("Error al obtener los usuarios registrados:", error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <div className={styles.home}>
      {cardData.length > 0 ? (
        cardData.map((user) => (
          <div key={user._id} className={styles.card}>
            <span className={styles.datos}>
              <img
                className={styles.fotoPerfil}
                src={user.imagen_perfil || avatar} // Aquí podrías usar una imagen del usuario si está disponible
                alt="foto de perfil"
              />
            </span>
            <span className={styles.datos}>
              <h2>Nombre: {user.nombre }</h2> {/* Accede a 'nombre_usuario' */}
              <h2>Apellido: {user.apellido}</h2> {/* Accede a 'apellido_usuario' */}
              <h2>Correo Electrónico: {user.correo_electronico}</h2> 
              <div className={styles.contLink}>
                <Link className={styles.boton}>Ver más</Link>
              </div>
            </span>
          </div>
        ))
      ) : (
        <p>Cargando...</p> // Mensaje mientras se cargan los datos
      )}
    </div>
  );
};

export default Card;