import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export const CvModificada = () => {
  const [cvData, setCvData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [areasOcupacion, setAreasOcupacion] = useState([]);
  const [tiposOcupacion, setTiposOcupacion] = useState([]);
  const [aptitudes, setAptitudes] = useState([]);
  const [selectedAptitudes, setSelectedAptitudes] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

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
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la hoja de vida registrada");
        }

        const data = await response.json();
        setCvData(data);
        setFormData(data.cvData);

        setSelectedAptitudes(data.cvData.aptitudes.map((apt) => apt._id) || []); // Asegúrate de usar el campo correcto
        // Verificar el estado del CV después de obtener los datos
        if (data.cvData && !data.cvData.estado) { // Asegúrate de que "estado" sea la propiedad correcta
          navigate('/reactivar-cv'); // Redirigir a la página de reactivación si el CV está desactivado
        }
      } catch (error) {
        console.error("Error al obtener la hoja de vida registrada:", error);
      }
    };

    fetchCvData();
  }, [navigate]);

  useEffect(() => {
    const fetchAreasOcupacion = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(Global.url + "user/get-areas-ocupacion", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error("Error en la red al obtener áreas de ocupación");
        }
        const data = await response.json();
        setAreasOcupacion(data.areasOcupacion);
      } catch (error) {
        console.error("Error fetching areas de ocupación:", error);
      }
    };

    fetchAreasOcupacion();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Obtenemos el nombre, valor, tipo y si está chequeado

    if (type === "checkbox") {
      // Si el checkbox está marcado, añadirlo; si no, removerlo
      setSelectedAptitudes((prevSelected) => {
        if (checked) {
          return [...prevSelected, value];
        } else {
          return prevSelected.filter((apt) => apt !== value);
        }
      });
    } else {
      // Para otros campos, actualizar el estado del formulario
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAreaChange = (e) => {
    const { value } = e.target;

    // Actualizar formData al cambiar el área
    const selectedArea = areasOcupacion.find(
      (area) => area.areaOcupacionId === value
    );
    setFormData((prevState) => ({
      ...prevState,
      area_ocupacion: selectedArea, // Actualiza el área ocupación en formData
    }));

    setTiposOcupacion(selectedArea ? selectedArea.tiposOcupacion : []);
    setAptitudes([]); // Reinicia las aptitudes al cambiar el área
  };

  const handleTipoChange = (e) => {
    const { value } = e.target;

    // Actualizar formData al cambiar el tipo
    const selectedTipo = tiposOcupacion.find(
      (tipo) => tipo.tipoAreaOcupacionId === value
    );
    setFormData((prevState) => ({
      ...prevState,
      tipo_area_ocupacion: selectedTipo, // Actualiza el tipo ocupación en formData
    }));

    setAptitudes(selectedTipo ? selectedTipo.aptitudes : []);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      console.log("Datos del formulario:", formData);

      const response = await fetch(Global.url + "user/modificar-cv", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la hoja de vida");
      }

      const data = await response.json();
      setCvData(data);
      window.location.reload();
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
    _id: _id,
    nombre_usuario,
    apellido_usuario,
    segundo_nombre,
    segundo_apellido,
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
  } = formData;

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Modificar hoja de vida</h1>
        <div className={styles.subContenedorCv}>
          <h3>Información registrada</h3>
          <form onSubmit={handleSubmit} className={styles.formCv}>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Primer nombre</label>
                <input
                  type="text"
                  name="nombre_usuario"
                  value={nombre_usuario || ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
              <div className={styles.input}>
                <label>Primer apellido</label>
                <input
                  type="text"
                  name="apellido_usuario"
                  value={apellido_usuario || ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Segundo nombre</label>
                <input
                  type="text"
                  name="segundo_nombre"
                  onChange={handleChange}
                  value={segundo_nombre || ""}
                  disabled={true}
                />
              </div>
              <div className={styles.input}>
                <label>Segundo apellido</label>
                <input
                  type="text"
                  name="segundo_apellido"
                  onChange={handleChange}
                  value={segundo_apellido || ""}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className={styles.input}>
                <label>Correo eléctronico</label>
                <input
                  type="email"
                  name="correo_usuario"
                  value={correo_usuario || ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
              <div className={styles.input}>
                <label>Tipo de documento</label>
                <input
                  type="text"
                  name="tipo_documento"
                  value={tipo_documento || ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <div className={styles.input}>
                <label>Celular</label>
                <input
                  type="text"
                  name="celular"
                  value={celular || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.input}>
                <label>Número de documento</label>
                <input
                  type="text"
                  name="numero_dto"
                  value={numero_dto || ""}
                  onChange={handleChange}
                  disabled={true}
                />
              </div>
            </div>
            <div className={styles.input}>
              <label>Bio</label>
              <textarea
                name="bio"
                value={bio || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input}>
              <label>Ocupación</label>
              <input
                type="text"
                name="ocupacion"
                value={ocupacion || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input}>
              <label>Municipio de residencia</label>
              <input
                type="text"
                name="region_residencia"
                value={region_residencia || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input}>
              <label> Tiempo de experiencia</label>
              <input
                type="number"
                name="tiempo_experiencia"
                value={tiempo_experiencia || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input}>
              <label>Área de ocupación</label>
              <select
                name="areaOcupacion"
                value={area_ocupacion?.areaOcupacionId || ""}
                onChange={handleAreaChange}
                disabled={!isEditing}
              >
                <option value="">Selecciona un área</option>
                {areasOcupacion.map((area) => (
                  <option
                    key={area.areaOcupacionId}
                    value={area.areaOcupacionId}
                  >
                    {area.nombre}
                  </option>
                ))}
              </select>
              {isEditing && (
                <div>
                  Seleccionado: {area_ocupacion?.nombre || "No seleccionado"}
                </div>
              )}
            </div>
            <div className={styles.input}>
              <label>Tipo de ocupación</label>
              <select
                name="tipoOcupacion"
                value={tipo_area_ocupacion?.tipoAreaOcupacionId || ""}
                onChange={handleTipoChange}
                disabled={!isEditing}
              >
                <option value="">Selecciona un tipo</option>
                {tiposOcupacion.map((tipo) => (
                  <option
                    key={tipo.tipoAreaOcupacionId}
                    value={tipo.tipoAreaOcupacionId}
                  >
                    {tipo.nombre}
                  </option>
                ))}
              </select>
              {isEditing && (
                <div>
                  Seleccionado:{" "}
                  {tipo_area_ocupacion?.nombre || "No seleccionado"}
                </div>
              )}
            </div>
            <div className={styles.input}>
              <strong>Aptitudes:</strong>
              {aptitudes.length > 0 ? (
                aptitudes.map((apt) => (
                  <div key={apt.aptitudId}>
                    <label>
                      <input
                        type="checkbox"
                        name="aptitudes"
                        value={apt._id} // Asegúrate de que este valor sea único
                        checked={selectedAptitudes.includes(apt._id)}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      {apt.nombre}
                    </label>
                  </div>
                ))
              ) : (
                <p>No hay aptitudes disponibles</p>
              )}
            </div>
            <button type="button" onClick={handleEditToggle} className={styles.btnSubmit}>
              {isEditing ? "Cancelar" : "Editar"}
            </button>
            {isEditing && <button type="submit" className={styles.btnSubmit}>Guardar cambios</button>}
          </form>
        </div>
      </div>
    </>
  );
};
