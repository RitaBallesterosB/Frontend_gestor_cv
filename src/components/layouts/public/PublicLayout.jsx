import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PublicLayout = () => {
  const { auth } = useAuth();

  // Verifica si el usuario está autenticado
  if (auth.isAuthenticated) {
    return (
      <>
        {/* Contenido Principal */}
        <section>
          <Outlet />
        </section>
      </>
    );
  } else {
    // Si no está autenticado, redirige al login
    return <Navigate to="/login" />;
  }
};
