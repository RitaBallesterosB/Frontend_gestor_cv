import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";

export const CvModificada = () => {
  const [cvData, setCvData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

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
            "Authorization": token,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la hoja de vida registrada");
        }

        const data = await response.json();
        setCvData(data);
        setFormData(data.cvData); // Initialize formData with the fetched data
      } catch (error) {
        console.error("Error al obtener la hoja de vida registrada:", error);
      }
    };

    fetchCvData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your API call to update the data here
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Global.url + "user/modificar-cv", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la hoja de vida");
      }

      const data = await response.json();
      setCvData(data);
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error al actualizar la hoja de vida:", error);
    }
  };

  if (!cvData || !cvData.cvData) {
    return (
      <>
        <HeaderPriv />
        <div className={styles.contenedorCv}>
          <h1>Cargando...</h1>
        </div>
      </>
    );
  }

  const { 
    nombre_usuario, 
    apellido_usuario, 
    correo_usuario, 
    celular, 
    tipo_documento, 
    numero_dto, 
    bio, 
    ocupacion, 
    region_residencia, 
    tiempo_experiencia, 
    area_ocupacion, 
    tipo_area_ocupacion, 
    aptitudes 
  } = formData; // Use formData for displaying values

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Hoja de vida registrada</h1>
        <form onSubmit={handleSubmit} className={styles.subContenedorCv}>
          <h3>Información registrada</h3>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <label>Nombre</label>
              <input value={nombre_usuario} readOnly />
            </div>
            <div className={styles.infoItem}>
              <label>Apellido</label>
              <input value={apellido_usuario} readOnly />
            </div>
            <div className={styles.infoItem}>
              <strong>Correo electrónico:</strong> {correo_usuario}
            </div>
            <div className={styles.infoItem}>
              <strong>Celular:</strong>
              <input 
                name="celular"
                value={celular} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Tipo de documento:</strong> {tipo_documento}
            </div>
            <div className={styles.infoItem}>
              <strong>Número de documento:</strong> {numero_dto}
            </div>
            <div className={styles.infoItem}>
              <strong>Bio:</strong>
              <input 
                name="bio"
                value={bio} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Ocupación:</strong>
              <input 
                name="ocupacion"
                value={ocupacion} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Municipio de residencia:</strong>
              <input 
                name="region_residencia"
                value={region_residencia} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Tiempo de experiencia:</strong>
              <input 
                name="tiempo_experiencia"
                value={tiempo_experiencia} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Área de ocupación:</strong>
              <input 
                name="area_ocupacion"
                value={area_ocupacion?.nombre} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Tipo de ocupación:</strong>
              <input 
                name="tipo_area_ocupacion"
                value={tipo_area_ocupacion?.nombre} 
                onChange={handleChange}
                readOnly={!isEditing} // Make it editable only in edit mode
              />
            </div>
            <div className={styles.infoItem}>
              <strong>Aptitudes:</strong> {Array.isArray(aptitudes) ? aptitudes.map(apt => apt.nombre).join(", ") : "No especificado"}
            </div>
          </div>
          <button type="button" onClick={handleEditToggle}>
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          {isEditing && <button type="submit">Guardar cambios</button>}
        </form>
      </div>
    </>
  );
};
