
import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/default.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Cv = () => {
  // Se recibe la información desde el Contexto a través del hook useAuth
  const { auth } = useAuth();

  const navigate = useNavigate();


  const profileImage =
    auth.imagen_perfil && auth.imagen_perfil !== "default.png"
      ? auth.imagen_perfil
      : avatar;

  // Estado para mostrar resultado del registro del user
  const [saved, setSaved] = useState("not_saved");

  // Variable para almacenar el token para las peticiones a realizar en este componente
  const token = localStorage.getItem("token");

  // Usamos el hook personalizado useForm
  const { form, changed, resetForm } = useForm({
    nombre_usuario: auth.nombre || "",
    apellido_usuario: auth.apellido || "",
    correo_electronico: auth.correo_electronico || "",

    celular: "",
    tipo_documento: "",
    numero_dto: "",
    bio: "",
    ocupacion: "",
    region_residencia: "",
    tiempo_experiencia: "",
    areaOcupacion: "",
    tipoOcupacion: "",
    aptitudes: [],
  });

  const [areasOcupacion, setAreasOcupacion] = useState([]);
  const [tiposOcupacion, setTiposOcupacion] = useState([]);
  const [aptitudes, setAptitudes] = useState([]);

  // Fetch áreas de ocupación desde el backend
  useEffect(() => {
    const fetchAreasOcupacion = async () => {
      try {
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
  }, [token]);

  // Manejar cambio en el selector de área de ocupación
  const handleAreaChange = (e) => {
    const { value } = e.target;

    changed({ target: { name: "areaOcupacion", value } });

    // Aquí puedes gestionar los tipos de ocupación y aptitudes según la lógica que necesites
    if (value) {
      const selectedArea = areasOcupacion.find(
        (area) => area.areaOcupacionId === value
      );
      if (selectedArea) {
        setTiposOcupacion(selectedArea.tiposOcupacion);
      } else {
        setTiposOcupacion([]);
      }
      setAptitudes([]); // Reinicia las aptitudes
    } else {
      setTiposOcupacion([]);
      setAptitudes([]);
    }
  };

  // Manejar cambio en el selector de tipo de ocupación
  const handleTipoChange = (e) => {
    const { value } = e.target;

    changed({ target: { name: "tipoOcupacion", value } });

    const selectedTipo = tiposOcupacion.find(
      (tipo) => tipo.tipoAreaOcupacionId === value
    );
    setAptitudes(selectedTipo ? selectedTipo.aptitudes : []);
  };

 
// Efecto para precargar los datos del usuario SE AJUSTÓ CAUSABA UN BUCLE, por eso tocaba recargar la página para que guardara la foto e iniciales Cada vez que llamas a resetForm, estás actualizando el estado que está siendo observado por useEffect. Si este estado no cambia realmente, el efecto se disparará repetidamente, lo que puede resultar en un bucle infinito.

// Modificación del useEffect: Cambia la lógica del useEffect que precarga los datos del usuario para que solo se ejecute cuando haya cambios reales en auth. Aquí tienes una versión corregida:

useEffect(() => {
  if (auth) {
    const shouldResetForm =
      form.nombre_usuario !== auth.nombre ||
      form.apellido_usuario !== auth.apellido ||
      form.correo_electronico !== auth.correo_electronico;

    if (shouldResetForm) {
      resetForm({
        nombre_usuario: auth.nombre || "",
        apellido_usuario: auth.apellido || "",
        correo_electronico: auth.correo_electronico || "",
        celular: "",
        tipo_documento: "",
        numero_dto: "",
        bio: "",
        ocupacion: "",
        region_residencia: "",
        tiempo_experiencia: "",
        areaOcupacion: "",
        tipoOcupacion: "",
        aptitudes: [],
      });
    }
  }
}, [auth, form.nombre_usuario, form.apellido_usuario, form.correo_electronico, resetForm]);


  const [municipios, setMunicipios] = useState([]);

  // Función para obtener las regiones desde la API
  const obtenerMunicipios = async () => {
    try {
      const response = await fetch(
        "https://www.datos.gov.co/resource/xdk5-pm3f.json"
      );
      const data = await response.json();
      const municipiosUnicos = [...new Set(data.map((item) => item.municipio))];
      setMunicipios(municipiosUnicos);
    } catch (error) {
      console.error("Error al obtener los municipios:", error);
    }
  };

  useEffect(() => {
    obtenerMunicipios();
  }, []);

  const registerCv = async (e) => {
    e.preventDefault();
  
    const { areaOcupacion, tipoOcupacion, ...rest } = form;
  
    const dataToSend = {
      ...rest,
      area_ocupacion: areaOcupacion, // Cambiar el nombre a area_ocupacion
      tipo_area_ocupacion: tipoOcupacion, // Cambiar el nombre a tipo_area_ocupacion
      aptitudes: form.aptitudes.filter((apt) => apt), // Filtrar valores vacíos
    };
  
    try {
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }
  
      console.log("Data to send:", dataToSend);
  
      const request = await fetch(Global.url + "user/hoja-de-vida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await request.json();

  
      if (request.status === 201) {
        setSaved("saved")
        // Mostrar modal de éxito
        Swal.fire({
          title: "Hoja de vida creada correctamente",
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          // Redirigir después de cerrar el modal
          navigate("/cv-registrada");
        });
      } else {
        setSaved("error")
        // Mostrar modal de error
        Swal.fire({
          title:"¡Error al registrar la hoja de vida!",
          icon: "error",
          confirmButtonText: "Intentar nuevamente",
        });
      }
    } catch (error) {
      console.error("Error al registrar la hoja de vida:", error);
      // Mostrar modal de error en caso de excepciones
      Swal.fire({
        title: "Error en la conexión",
        text: "No se pudo conectar al servidor. Intente nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Hoja de vida</h1>
        <div className={styles.subContenedorCv}>
          <h3>Los campos con * son obligatorios</h3>
          <img
            src={profileImage}
            className={styles.userphoto}
            alt="Foto de perfil"
          />
          <form className={styles.formCv} onSubmit={registerCv}>
            {/* Nombre y Apellido */}
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label htmlFor="nombre_usuario">Primer nombre:</label>
                <input
                  type="text"
                  id="nombre_usuario"
                  name="nombre_usuario"
                  value={form.nombre_usuario}
                  readOnly
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="apellido_usuario">Primero apellido:</label>
                <input
                  type="text"
                  name="apellido_usuario"
                  id="apellido_usuario"
                  value={form.apellido_usuario}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label htmlFor="segundo_nombre">Segundo nombre:</label>
                <input
                  type="text"
                  placeholder="Ingrese su segundo nombre"
                  id="segundo_nombre"
                  name="segundo_nombre"
                  onChange={changed}
                  value={form.segundo_nombre}
                  autoComplete="given-name"
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="segundo_apellido">Segundo apellido:</label>
                <input
                  type="text"
                  placeholder="Ingrese su segundo apellido"
                  id="segundo_apellido"
                  name="segundo_apellido"
                  onChange={changed}
                  value={form.segundo_apellido}
                  autoComplete="given-name"
                />
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label htmlFor="celular">Celular*:</label>
                <input
                  type="text"
                  placeholder="Ingrese su número de celular"
                  name="celular"
                  id="celular"
                  onChange={changed}
                  value={form.celular || ""}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="tipo_documento">Tipo de documento*:</label>
                <select
                  id="tipo_documento"
                  name="tipo_documento"
                  onChange={changed}
                  value={form.tipo_documento || ""}
                  required
                >
                  <option value="">Seleccione un tipo de documento</option>
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="PP">PP</option>
                </select>
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label htmlFor="correo_electronico">Correo eléctronico:</label>
                <input
                  type="email"
                  id="correo_electronico"
                  name="correo_electronico"
                  value={form.correo_electronico}
                  readOnly
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="numero_dto">Número de documento*:</label>
                <input
                  type="number"
                  placeholder="Ingrese su número de documento sin puntos ni comas"
                  name="numero_dto"
                  id="numero_dto"
                  onChange={changed}
                  value={form.numero_dto || ""}
                  required
                />
              </div>
            </div>
            <div className={styles.input}>
              <label>Bio*: </label>
              <textarea
                placeholder="Ingresa una breve descripción acerca de su experiencia laboral"
                id="bio"
                name="bio"
                value={form.bio}
                onChange={changed}
                required
              />
            </div>
              <div className={styles.input}>
                <label htmlFor="ocupacion">Ocupación*: </label>
                <input
                  type="text"
                  placeholder="Ingrese su ocupación"
                  id="ocupacion"
                  name="ocupacion"
                  onChange={changed}
                  value={form.ocupacion || ""}
                  required
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="region_residencia">
                  Municipio de residencia*:{" "}
                </label>
                <select
                  id="region_residencia"
                  name="region_residencia"
                  value={form.region_residencia || ""}
                  onChange={changed}
                  required
                >
                  <option value="">Seleccione un Municipio</option>{" "}
                  {/* Opción por defecto */}
                  {municipios.map((municipio, index) => (
                    <option key={index} value={municipio}>
                      {municipio}
                    </option>
                  ))}
                </select>
              </div>
            <div className={styles.input}>
              <label htmlFor="tiempo_experiencia">
                Tiempo de experiencia*:{" "}
              </label>
              <input
                type="number"
                placeholder="Ingrese su tiempo de experiencia en años"
                name="tiempo_experiencia"
                id="tiempo_experiencia"
                onChange={changed}
                value={form.tiempo_experiencia || ""}
                required
              />
            </div>
            {/* Área de Ocupación */}
            <div className={styles.input}>
              <label>Área de ocupación*:</label>
              <select
                name="areaOcupacion"
                value={form.areaOcupacion || ""}
                onChange={handleAreaChange}
                required
              >
                <option value="">Seleccione un área</option>
                {areasOcupacion.map((area) => (
                  <option
                    key={area.areaOcupacionId}
                    value={area.areaOcupacionId}
                  >
                    {area.nombre}
                  </option>
                ))}
              </select>
            </div>
            {/* Tipos de Ocupación */}
            {tiposOcupacion.length > 0 && (
              <div className={styles.input}>
                <label>Tipo de ocupación*:</label>
                <select
                  name="tipoOcupacion"
                  value={form.tipoOcupacion || ""}
                  onChange={handleTipoChange}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {tiposOcupacion.map((tipo) => (
                    <option
                      key={tipo.tipoAreaOcupacionId}
                      value={tipo.tipoAreaOcupacionId}
                    >
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Aptitudes */}
            {aptitudes.length > 0 && (
              <div className={styles.input}>
                <label>Aptitudes*:</label>
                <div className={styles.contenedorAptitudes}>
                  {aptitudes.map((aptitud) => (
                    <div key={aptitud._id} className={styles.aptitudItem}>
                      <label>
                        <input
                          type="checkbox"
                          value={aptitud._id}
                          onChange={(e) => {
                            const { checked, value } = e.target;
                            const updatedAptitudes = checked
                              ? [...form.aptitudes, value]
                              : form.aptitudes.filter((apt) => apt !== value);
                            changed({
                              target: {
                                name: "aptitudes",
                                value: updatedAptitudes,
                              },
                            });
                          }}
                        />
                        {aptitud.nombre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button type="submit" className={styles.btnSubmit}>
              Registrar hoja de vida
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
