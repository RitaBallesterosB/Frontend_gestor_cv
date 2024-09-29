import { HeaderPub } from "../layouts/public/HeaderPub";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2"; // Importa SweetAlert2
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";


export const Register = () => {
  // Usamos el hook personalizado useForm para cargar los datos del formulario
  const { form, changed } = useForm({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    password: "",
    imagen_perfil: null, // Inicialmente null para la imagen
  });
  // Estado para mostrar resultado del registro del user
  const [saved, setSaved] = useState("not sended");
  // Hook para redirigir
  const navigate = useNavigate();

  // Guardar un usuario en la BD
  const saveUser = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("apellido", form.apellido);
    formData.append("correo_electronico", form.correo_electronico);
    formData.append("password", form.password);
    
    if (form.imagen_perfil) {
      formData.append("file0", form.imagen_perfil);
    }
  
    try {
      const request = await fetch(Global.url + "user/register", {
        method: "POST",
        body: formData,
      });
  
      console.log("Status:", request.status);
      const data = await request.json();
      console.log(data);
  
      if (request.status === 201 && data.status === "success") {
        setSaved("saved");
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Token guardado:", localStorage.getItem("token"));
        console.log("Usuario guardado:", localStorage.getItem("user"));
  
        Swal.fire({
          title: data.message,
          icon: "success",
          confirmButtonText: "Continuar",
        }).then(() => {
          navigate("/cv-registrada");
        });
      } else {
        setSaved("error");
        Swal.fire({
          title: data.message || "¡Error en el registro!",
          icon: "error",
          confirmButtonText: "Intentar nuevamente",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "¡Error en la conexión!",
        icon: "error",
        confirmButtonText: "Intentar nuevamente",
      });
    }
  };
  

  return (
    <>
      <HeaderPub />
      <div className={styles.contenedorRegister}>
        <h1>Crear cuenta</h1>
        <div className={styles.subcontenedorRegister}>
          <div className={styles.subcontenedor}>
            <div className={styles.volverLogin}>
              <h4>¿Ya eres un usuario registrado?</h4>
              <Link to={"/login"} className={styles.link}>Por favor iniciar sesión</Link>
            </div>
            <p>
              Para continuar, debes tener en cuenta que todos los campos del
              formulario con * son obligatorios para crear una cuenta.
            </p>
          </div>

          <form className={styles.formRegister} onSubmit={saveUser}>
            <div className={styles.input}>
              <label htmlFor="nombre">Nombre*:</label>
              <input
                type="text"
                placeholder="Ingrese su primer nombre"
                id="nombre"
                name="nombre"
                onChange={changed}
                value={form.nombre || ""}
                autoComplete="given-name"
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="apellido">Apellido*:</label>
              <input
                type="text"
                placeholder="Ingrese su primer apellido"
                id="apellido"
                name="apellido"
                required
                onChange={changed}
                value={form.apellido || ""}
                autoComplete="family-name"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="correo_electronico">Correo electrónico*:</label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                id="correo_electronico"
                name="correo_electronico"
                value={form.correo_electronico || ""}
                onChange={changed}
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Contraseña*:</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                id="password"
                name="password"
                value={form.password}
                onChange={changed}
                autoComplete="current-password"
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="imagen_perfil">
                Imagen de perfil*:
              </label>
              <input
                type="file"
                name="imagen_perfil"
                id="imagen_perfil"
                onChange={changed}
                required
              />
            </div>
            <input className={styles.botonSubmit} type="submit" value="Registrarse" />
          </form>
        </div>
      </div>
    </>
  );
};
