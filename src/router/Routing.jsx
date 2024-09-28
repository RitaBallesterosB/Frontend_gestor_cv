import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Cv } from "../components/user_cv/Cv";
import { PublicLayout } from "../components/layouts/public/PublicLayout";
import { Navigate } from "react-router-dom";
import { Dashboard } from "../components/admin/Dashboard";
import { AuthProvider } from "../context/AuthProvider";
import { CvRegistrada } from "../components/user_cv/CvRegistrada";
import { CvModificada } from "../components/user_cv/CvModificada";
import { ReactivarCv } from "../components/user_cv/ReactivarCv";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirección cuando la ruta es exactamente la raíz */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Rutas para cargar los componentes de la ruta pública */}
          <Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* Rutas para cargar los componentes de la ruta privada */}
          <Route>
            <Route path="cv" element={<Cv />} />
            <Route path="cv-registrada" element={<CvRegistrada />} />
            <Route path="cv-modificada" element={<CvModificada />} />
            <Route path="reactivar-cv" element={<ReactivarCv />} />
          </Route>
          {/* Rutas para cargar los componentes del administrador */}
          <Route>
            <Route path="admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
