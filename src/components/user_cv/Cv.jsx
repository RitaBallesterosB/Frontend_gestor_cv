import { HeaderPriv } from "../layouts/private/HeaderPriv";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import styles from "./Cv.module.css";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Cv = () => {
  // Se recibe la información desde el Contexto a través del hook useAuth
  const { auth } = useAuth();
  console.log(auth); // Verifica qué datos estás obteniendo

  // Estado para mostrar resultado del registro del user
  const [saved, setSaved] = useState("not_saved");

  // Variable para almacenar el token para las peticiones a realizar en este componente
  const token = localStorage.getItem("token");

  // Usamos el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({
    nombre_usuario: auth.nombre || "", // Inicializa con los datos del usuario
    apellido_usuario: auth.apellido || "",
    correo_electronico: auth.correo_electronico || "",
    celular: "",
    tipo_documento: "",
    numero_dto: "",
    bio: "",
    ocupacion: "",
    region_residencia: "",
    tiempo_experiencia: "",
    area_ocupacion: "",
    tipo_area_ocupacion: "",
    aptitudes: ""
  });

  console.log(form)

  // Estado para almacenar las regiones
  const [municipios, setMunicipios] = useState([]);

  // Función para obtener las regiones desde la API
  const obtenerMunicipios = async () => {
    try {
      const response = await fetch(
        "https://www.datos.gov.co/resource/xdk5-pm3f.json"
      );
      const data = await response.json();
      // Filtramos para que las regiones no se repitan
      const municipiosUnicos = [...new Set(data.map((item) => item.municipio))];
      setMunicipios(municipiosUnicos); // Guardamos las regiones en el estado
    } catch (error) {
      console.error("Error al obtener los municipios:", error);
    }
  };

  // Hacemos la solicitud a la API cuando el componente se monta
  useEffect(() => {
    obtenerMunicipios();
  }, []); // [] asegura que se ejecute solo una vez cuando el componente se monta

  const registerCv = async (e) => {
    //prevenir que se actualice el navegador
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token de autenticación");
        return;
      }

      // Petición para registrar la hoja de vida
      const request = await fetch(Global.url + "user/hoja-de-vida", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(form), // Enviamos el formulario como JSON
      });

      const data = await request.json();

    } catch (error) {
      console.error("Error al registrar la hoja de vida:", error);
    }
  };
    

  return (
    <>
      <HeaderPriv />
      <div className={styles.contenedorCv}>
        <h1>Hoja de vida</h1>
        <div className={styles.subContenedorCv}>
          <h3>Los campos con * son obligatorios</h3>
          <form className={styles.formCv} onSubmit={registerCv}>
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
                <label htmlFor="apellido_usuario">
                  Primero apellido:
                </label>
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
                  type="number"
                  placeholder="Ingrese su número de celular"
                  name="celular"
                  id="celular"
                  onChange={changed}
                  value={form.celular || ""}
                  required
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="tipo_documento">Tipo de documento*:</label>
                <select id="tipo_documento" name="tipo_documento" required>
                  <option value="">Seleccione un tipo de documento</option>
                  <option value={form.tipo_documento}>CC</option>
                  <option value={form.tipo_documento}>CE</option>
                  <option value={form.tipo_documento}>PP</option>
                </select>
              </div>
            </div>
            <div className={styles.contenedorInput}>
              <div className={styles.input}>
                <label htmlFor="correo_electronico">
                  Correo eléctronico:
                </label>
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
                value={form.bio}
                onChange={changed}
                required
              />
            </div>
            <div className={styles.contenedorInput}>
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
            <div>
              <label htmlFor="certificaciones_experiencia">
                Certificaciones de experiencia: (Últimas 3 certificaciones)
              </label>
              <input
                type="file"
                name="certificaciones_experiencia"
                id="certificaciones_experiencia"
                autoComplete="file"
              />
            </div>
            <div>
              <span>A continuación elija su área de trabajo:</span>
              <div>
                <label htmlFor="area_ocupacion">
                  <input
                    type="checkbox"
                    id="area_ocupacion"
                    name="area_ocupacion"
                  />
                  Ingeniería
                </label>
                <label htmlFor="area_ocupacion">
                  <input
                    type="checkbox"
                    id="area_ocupacion"
                    name="area_ocupacion"
                  />
                  Administración
                </label>
                <label htmlFor="area_ocupacion">
                  <input
                    type="checkbox"
                    id="area_ocupacion"
                    name="area_ocupacion"
                  />
                  Trabajo de campo
                </label>
              </div>
            </div>
            <div>
              <span>Seleccione la subespecialidad de su área de trabajo</span>
              <div>
                <label htmlFor="tipo_area_ocupacion">
                  <input
                    type="checkbox"
                    id="tipo_area_ocupacion"
                    name="tipo_area_ocupacion"
                  />
                  QAQC
                </label>
                <label htmlFor="tipo_area_ocupacion">
                  <input
                    type="checkbox"
                    id="tipo_area_ocupacion"
                    name="tipo_area_ocupacion"
                  />
                  Ingeniero Residente
                </label>
                <label htmlFor="tipo_area_ocupacion">
                  <input
                    type="checkbox"
                    id="tipo_area_ocupacion"
                    name="tipo_area_ocupacion"
                  />
                  Oficina técnica
                </label>
              </div>
            </div>
            <div>
              <span>
                Seleccione las aptitudes correspondientes a su subespecialidad
              </span>
              <div>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Autocad
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Herramientas de ofimatica
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Normas control de calidad
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Estandares de calidad
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Bases de datos
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Manejo de herramientas de gestión de pruebas
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Manejo de herramientas de gestión de proyectos
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Manejo software de diseño
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Capacidad de análisis
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Gestión documental y planos
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Control de costos
                </label>
                <label htmlFor="aptitudes">
                  <input type="checkbox" id="aptitudes" name="aptitudes" />
                  Supervisión de reingeniería
                </label>
              </div>
            </div>
            <div>
              <input
                className={styles.botonSubmit}
                type="submit"
                value="Registrar hoja de vida"
             />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
