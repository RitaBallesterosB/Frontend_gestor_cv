import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const CvModificada = () => {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const [areasOcupacion, setAreasOcupacion] = useState([]);
  const [tiposOcupacion, setTiposOcupacion] = useState([]);
  const [aptitudes, setAptitudes] = useState([]);

  const [cvData, setCvData] = useState(null);
  const { form, changed, resetForm } = useForm({
    nombre_usuario: "",
    apellido_usuario: "",
    correo_electronico: "",
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

  useEffect(() => {
    const fetchCvData = async () => {
      try {
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
        // Rellenar el formulario con los datos existentes
        if (data && data.cvData) {
          resetForm({
            nombre_usuario: data.cvData.nombre_usuario,
            apellido_usuario: data.cvData.apellido_usuario,
            correo_electronico: data.cvData.correo_usuario,
            celular: data.cvData.celular,
            tipo_documento: data.cvData.tipo_documento,
            numero_dto: data.cvData.numero_dto,
            bio: data.cvData.bio,
            ocupacion: data.cvData.ocupacion,
            region_residencia: data.cvData.region_residencia,
            tiempo_experiencia: data.cvData.tiempo_experiencia,
            areaOcupacion: data.cvData.area_ocupacion.areaOcupacionId,
            tipoOcupacion: data.cvData.tipo_area_ocupacion.tipoAreaOcupacionId,
            aptitudes: data.cvData.aptitudes.map(apt => apt._id), // Asegúrate de que aptitudes tenga los IDs
          });
        }
      } catch (error) {
        console.error("Error al obtener la hoja de vida registrada:", error);
      }
    };

    fetchCvData();
  }, [resetForm, token]);

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


  const updateCv = async (e) => {
    e.preventDefault();

    const { areaOcupacion, tipoOcupacion, ...rest } = form;

    const dataToSend = {
      ...rest,
      area_ocupacion: areaOcupacion,
      tipo_area_ocupacion: tipoOcupacion,
      aptitudes: form.aptitudes.filter((apt) => apt),
    };

    try {
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }

      const request = await fetch(Global.url + "user/modificar-cv", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await request.json();
      console.log("Response del servidor:", data);
      // Aquí puedes agregar un mensaje de éxito o redirigir si es necesario
    } catch (error) {
      console.error("Error al actualizar la hoja de vida:", error);
    }
  };

  if (!cvData) {
    return (
      <>
        <HeaderPriv />
        <div className={styles.contenedorCv}>
          <h1>Cargando...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Modificar Hoja de Vida</h1>
        <div className={styles.subContenedorCv}>
          <h3>Información registrada</h3>
          <form className={styles.formCv} onSubmit={updateCv}>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre_usuario"
                  value={form.nombre_usuario}
                  onChange={changed}
                  required
                />
              </div>
              <div className={styles.input}>
                <label>Apellido:</label>
                <input
                  type="text"
                  name="apellido_usuario"
                  value={form.apellido_usuario}
                  onChange={changed}
                  required
                />
              </div>
            </div>
            <div className={styles.input}>
              <label>Correo electrónico:</label>
              <input
                type="email"
                name="correo_electronico"
                value={form.correo_electronico}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Celular:</label>
              <input
                type="text"
                name="celular"
                value={form.celular}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Tipo de documento:</label>
              <select
                name="tipo_documento"
                value={form.tipo_documento}
                onChange={changed}
                required
              >
                <option value="">Seleccione un tipo de documento</option>
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="PP">PP</option>
              </select>
            </div>
            <div className={styles.input}>
              <label>Número de documento:</label>
              <input
                type="number"
                name="numero_dto"
                value={form.numero_dto}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Ocupación:</label>
              <input
                type="text"
                name="ocupacion"
                value={form.ocupacion}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Municipio de residencia:</label>
              <select
                name="region_residencia"
                value={form.region_residencia}
                onChange={changed}
                required
              >
                <option value="">Seleccione un Municipio</option>
                {municipios.map((municipio, index) => (
                    <option key={index} value={municipio}>
                      {municipio}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.input}>
              <label>Tiempo de experiencia:</label>
              <input
                type="number"
                name="tiempo_experiencia"
                value={form.tiempo_experiencia}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.input}>
              <label>Área de ocupación:</label>
              <select
                name="areaOcupacion"
                value={form.areaOcupacion}
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
            <div className={styles.input}>
              <label>Tipo de ocupación:</label>
              <select
                name="tipoOcupacion"
                value={form.tipoOcupacion}
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
            <div className={styles.input}>
              <label>Aptitudes:</label>
              {aptitudes.map((aptitud) => (
                  <div key={aptitud._id}>
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
                        }}/>
                        {aptitud.nombre}
                    </label>
                  </div>
                  ))}
            </div>

            <button type="submit" className={styles.btnSubmit}>
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
