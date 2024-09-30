import styles from "./Dashboard.module.css";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const Buscador = ({funciones}) => {
  const navigate = useNavigate();

  const [saved, setSaved] = useState("not_saved");
  const token = localStorage.getItem("token");

  // Hook personalizado para el formulario
  const { form, changed, resetForm } = useForm({
    palabra_clave: "",
    region_residencia: "",
    areaOcupacion: "",
    tipoOcupacion: "",
    aptitudes: [],
  });

  const [areasOcupacion, setAreasOcupacion] = useState([]);
  const [tiposOcupacion, setTiposOcupacion] = useState([]);
  const [aptitudes, setAptitudes] = useState([]);
  const [municipios, setMunicipios] = useState([]);

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

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   changed({ target: { name: "aptitudes", value } });

  //   if (value) {
  //     const selectedAptitudes = aptitudes.find((apt) => apt._id === value);
  //     if (selectedAptitudes) {
  //       setAptitudes(selectedAptitudes.tipo.apt._id);
  //     } else {
  //       setAptitudes([]);
  //     }
  //   } else {
  //     setTiposOcupacion([]);
  //     setAptitudes([]);
  //   }
  // };

  const handleAreaChange = (e) => {
    const { value } = e.target;
    changed({ target: { name: "areaOcupacion", value } });

    if (value) {
      const selectedArea = areasOcupacion.find(
        (area) => area.areaOcupacionId === value
      );
      if (selectedArea) {
        setTiposOcupacion(selectedArea.tiposOcupacion);
      } else {
        setTiposOcupacion([]);
      }
      setAptitudes([]);
    } else {
      setTiposOcupacion([]);
      setAptitudes([]);
    }
  };

  const handleTipoChange = (e) => {
    const { value } = e.target;
    changed({ target: { name: "tipoOcupacion", value } });

    const selectedTipo = tiposOcupacion.find(
      (tipo) => tipo.tipoAreaOcupacionId === value
    );
    setAptitudes(selectedTipo ? selectedTipo.aptitudes : []);
  };

  // Obtener municipios desde la API externa
  useEffect(() => {
    const obtenerMunicipios = async () => {
      try {
        const response = await fetch(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        const data = await response.json();
        const municipiosUnicos = [
          ...new Set(data.map((item) => item.municipio)),
        ];
        setMunicipios(municipiosUnicos);
      } catch (error) {
        console.error("Error al obtener los municipios:", error);
      }
    };

    obtenerMunicipios();
  }, []);

  // Enviar la búsqueda al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Global.url + "admin/buscar-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          palabra_clave: form.palabra_clave,
          region_residencia: form.region_residencia,
          area_ocupacion: form.areaOcupacion,
          tipo_area_ocupacion: form.tipoOcupacion,
          aptitudes: form.aptitudes,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la búsqueda");
      }

      const result = await response.json();
      console.log("Resultados de búsqueda:", result.results);
      setSaved("saved");
      funciones.onRealizarBusqueda(result.results)
      Swal.fire("Búsqueda exitosa", "Resultados encontrados", "success");
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSaved("error");
      Swal.fire("Error", "Hubo un problema con la búsqueda", "error");
    }
  };

  return (
    <div className={styles.buscador}>
      <h1>DashBoard Management CV</h1>
      <div className={styles.subContenedorBuscador}>
        <p>
          Bienvenido a su Administrador de Hojas de Vida. Desde aquí podrá
          encontrar candidatos para un cargo específico, utilizando diversos
          criterios de búsqueda.
        </p>
        <form className={styles.formBuscador} onSubmit={handleSubmit}>
          <div className={styles.contenedorBuscador}>
            <div className={styles.input}>
              <label htmlFor="region_residencia">Municipio de residencia</label>
              <select
                id="region_residencia"
                name="region_residencia"
                value={form.region_residencia || ""}
                onChange={changed}
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
            <div className={styles.input}>
              {tiposOcupacion.length > 0 && (
                <>
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
                </>
              )}
            </div>
            {/* <div className={styles.input}>
              
              {aptitudes.length > 0 && (
                  <>
                    <label>Aptitudes</label>
                    <select
                      name="aptitudes"
                      value={form.aptitudes || ""}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione un tipo</option>
                      {aptitudes.map((apt) => (
                        <option key={apt._id} value={apt._id}>
                          {apt.nombre}
                        </option>
                      ))}
                    </select>
                  </>
                )}
            </div> */}
          </div>
          <div className={styles.contenedorBuscador}>
            <div className={styles.input}>
              <input
                type="text"
                placeholder="Ej: Administrador"
                name="palabra_clave"
                value={form.palabra_clave || ""}
                onChange={changed}
              />
            </div>
            <button type="submit" className={styles.botonBuscar}>
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};