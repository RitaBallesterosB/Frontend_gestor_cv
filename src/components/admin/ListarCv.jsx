import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";
import { Global } from "../../helpers/Global";
import { HeaderAdmin } from "./HeaderAdmin";
import { SideBar } from "./SideBar";

export const ListarCv = () => {
  const [listCv, setlistCv] = useState([]);

  useEffect(() => {
    const fetchListCv = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Verificar token
        if (!token) {
          throw new Error("Token no disponible");
        }

        const apiUrl = Global.url + "admin/listar-hojas-de-vida";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Error al obtener las hojas de vida registradas: ${errorText}`
          );
        }

        const data = await response.json();
        setlistCv(data);
        console.log(data)
      } catch (error) {
        console.error("Error al obtener las hojas de vida registradas:", error);
      }
    };
    fetchListCv();
  }, []);

  return (
    <div >
      <HeaderAdmin/>
      <SideBar/>
      <h2>Lista de hojas de vida registradas</h2>
      {listCv && (
      <table className={styles.contenedorTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Ocupación</th>
          </tr>
        </thead>
        <tbody>
          {listCv.map((item) => (
          <tr key={item._id}>
            <td>{item.nombre_usuario}</td>
            <td>{item.apellido_usuario}</td>
            <td>{item.ocupacion}</td>
          </tr>
          ))}
        </tbody>

      </table>
      )}
    </div>
  );
};
