import styles from "./Dashboard.module.css";
import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/default.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Buscador = () => {
  // Se recibe la información desde el Contexto a través del hook useAuth
  const { auth } = useAuth();

  const navigate = useNavigate();

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



// Manejar cambio en el selector de aptitudes - AGREGÓ RITA
const handleChange = (e) => {
  const { value } = e.target;

  changed({ target: { name: "aptitudes", value } });

  if (value) {
    const selectedAptitudes = aptitudes.find(
      (apt) => apt._id === value
    );
    if (selectedAptitudes) {
      setAptitudes(selectedAptitudes.tipo.apt._id); // Esto podría ser problemático
    } else {
      setAptitudes([]);
    }
  } else {
    setTiposOcupacion([]);
    setAptitudes([]);
  }
};




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

  // Efecto para precargar los datos del usuario
  useEffect(() => {
    if (
      auth &&
      (form.nombre_usuario !== auth.nombre ||
        form.apellido_usuario !== auth.apellido ||
        form.correo_electronico !== auth.correo_electronico)
    ) {
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
  }, [auth, resetForm]);

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

  return (
    <>
      <div className={styles.buscador}>
        <h1>DashBoard Management CV</h1>
        <div className={styles.subContenedorCv}>
          <p>
            Bienvenido a su Administrador de Hojas de Vida. Desde aquí podrá
            encontrar candidatos para un cargo específico, utilizando diversos
            criterios de búsqueda por palabras o características puntuales
          </p>
          <form className={styles.formBuscador}>
            <div>
            <div className={styles.input}>
              <label htmlFor="region_residencia">
                Municipio de residencia{" "}
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
            {/* Área de Ocupación */}
            <div className={styles.input}>
              <label>Área de ocupación</label>
              <select
                name="areaOcupacion"
                value={form.areaOcupacion || ""}
                onChange={handleAreaChange}
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
                <label>Tipo de ocupación</label>
                <select
                  name="tipoOcupacion"
                  value={form.tipoOcupacion || ""}
                  onChange={handleTipoChange}
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


             {/* aptitudes - RITA */}
             {aptitudes.length > 0 && (
              <div className={styles.input}>
                <label>Aptitudes</label>
                <select
                  name="aptitudes"
                  value={form.aptitudes || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un tipo</option>
                  {aptitudes.map((apt) => (
                    <option
                      key={apt._id}
                      value={apt._id}
                    >
                      {apt.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            
            

            <input type="text" placeholder="Ej: Administrador" />
            <button type="submit" className={styles.btnSubmit}>
              Buscar{" "}
            </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
