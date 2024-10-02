import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Global } from "../../helpers/Global";
import { HeaderAdmin } from "./HeaderAdmin";
import { SideBar } from "./SideBar";

export const ListarCv = () => {
  const [listCv, setlistCv] = useState([]);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

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
        console.log(data);
      } catch (error) {
        console.error("Error al obtener las hojas de vida registradas:", error);
      }
    };
    fetchListCv();
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <SideBar />
      <div className={styles.listarCvs}>
        <div>
          {/* <button className={styles.boton} onClick={handleGoBack}>
            <i className="fa-solid fa-arrow-left">   Anterior</i>
          </button> */}
          <Link
                      to={`/admin`}
                      className={styles.boton}
                    >   
                      Volver
                    </Link>

          <h2>Lista de hojas de vida registradas</h2>
        </div>
        {listCv && (
          <table>
            <thead  >
              <tr>
                <th >Nombre</th>
                <th>Apellido</th>
                <th>Ocupación</th>
                <th>Área ocupación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listCv.map((item) => (
                <tr key={item._id}>
                  <td>{item.nombre_usuario}</td>
                  <td>{item.apellido_usuario}</td>
                  <td>{item.ocupacion}</td>
                  <td>{item.area_ocupacion.nombre}</td>
                  <td>
                    <Link
                      to={`/ver-cv-registrada/${item._id}`}
                      className={styles.boton}
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
    </div>
  );
};
