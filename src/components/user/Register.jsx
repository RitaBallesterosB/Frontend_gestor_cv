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
    // Prevenir que se actualice la pantalla
    e.preventDefault();

     // Crear un FormData para enviar tanto texto como archivos
     const formData = new FormData();
     formData.append("nombre", form.nombre);
     formData.append("apellido", form.apellido);
     formData.append("correo_electronico", form.correo_electronico);
     formData.append("password", form.password);
 
     if (form.imagen_perfil) {
       formData.append("imagen_perfil", form.imagen_perfil); // Añadir el archivo de imagen
     }
 
     // Petición a la API del Backend para guardar usuario en la BD
     const request = await fetch(Global.url + "user/register", {
       method: "POST",
       body: formData, // Usamos FormData en lugar de JSON
     });

    // Obtener la información retornada por la request
    const data = await request.json();

    // Verificar si el estado de la respuesta del backend es "created" seteamos la variable saved con "saved" y si no, le asignamos "error", esto es para mostrar por pantalla el resultado del registro del usuario
    if (request.status === 201 && data.status === "success") {
      setSaved("saved");

      // Mostrar modal de éxito
      Swal.fire({
        title: data.message,
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        // Redirigir después de cerrar el modal
        console.log("Redirigiendo a /login después de crear el usuario");
        navigate("cv-registrada");
      });
    } else {
      setSaved("error");
     

      // Mostrar modal de error
      Swal.fire({
        title: data.message || "¡Error en el registro!",
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
