import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";
import { HeaderPub } from "../layouts/public/HeaderPub";
import { Link, useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import styles from "./Login.module.css";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

export const Login = () => {
  // Estado para obtener los datos desde el formulario
  const { form, changed, resetForm } = useForm({
    correo_electronico: "",
    password: "",
  });

  // Estado para validar si el usuario se identificó correctamente
  const [logged, setLogged] = useState("not logged");

  // Estado para setear los valores del token y usuario en el contexto de la aplicación
  const { setAuth } = useAuth();

  // Obtener la función navigate
  const navigate = useNavigate(); // Aquí llamas a useNavigate

  // useEffect para mostrar alertas basadas en el estado de logged
  useEffect(() => {
    if (logged === "logged") {
      Swal.fire({
        icon: "success",
        title: "¡Usuario autenticado correctamente!",
        showConfirmButton: false,
        timer: 1500, // Desaparece después de 1.5 segundos
      });
    } else if (logged === "error") {
      Swal.fire({
        icon: "error",
        title: "¡El usuario no se ha autenticado!",
        showConfirmButton: false,
        timer: 1500, // Desaparece después de 1.5 segundos
      });
    }
  }, [logged]); // Se ejecuta cada vez que cambia `logged`

  const loginUser = async (e) => {
    // prevenir que se actualice el navegador
    e.preventDefault();

    // Obtener los datos del formulario
    let userToLogin = form;

    // Petición al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Obtener la información retornada por la request
    const data = await request.json();

    if (data.status === "success") {
      // Guardar los datos del token y usuario en el localstorage del navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Seteamos la variable de estado logged si se autenticó correctamente el usuario
      setLogged("logged");

      // Seteamos los datos del usuario en el Auth
      setAuth(data.user);

      // Limpiar el formulario
      resetForm();

      // Redirección según el rol del usuario
      if (data.user.role === "ADMIN") {
        navigate("/admin"); // Redirigir a admin si el rol es admin
      } else {
        // Redirigir a /cv para otros usuarios
        setTimeout(() => {
          navigate("/cv");
        }, 1000);
      }
    } else {
      // Seteamos la variable de estado logged si no se autenticó el usuario
      setLogged("error");
    }
  };

  return (
    <>
      <HeaderPub />
      <div className={styles.contenedorLogin}>
        <div className={styles.login}>
          <div className={styles.title}>
            <h2>Bienvenido a RR.HH Tu gestor de hoja de vida de confianza</h2>
            <p>
              Para continuar, debe completar los campos a continuación para
              poder iniciar sesión
            </p>
          </div>

          <form className={styles.form} onSubmit={loginUser}>
            <div className={styles.input}>
              <label htmlFor="email">Correo electrónico: </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                id="email"
                name="correo_electronico"
                value={form?.correo_electronico || ""}
                onChange={changed}
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                id="password"
                name="password"
                value={form?.password || ""}
                onChange={changed}
                autoComplete="current-password"
                required
              />
            </div>
            <input
              className={styles.botonSubmit}
              type="submit"
              value="Iniciar Sesión"
            />
          </form>
          <div className={styles.input}>
            <p>¿Aún no eres un usuario registrado?</p>
            <Link to={"/register"} className={styles.link}>
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
