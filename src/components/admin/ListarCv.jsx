import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../assets/img/default.png";
import { Global } from "../../helpers/Global";

export const ListarCv = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
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
        setCardData(data);
      } catch (error) {
        console.error("Error al obtener las hojas de vida registradas:", error);
      }
    };

    fetchCardData();
  }, []);
  return <div>ListarCv</div>;
};
