import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Cv } from "../components/user_cv/Cv";
import { Navigate } from "react-router-dom";
import { Dashboard } from "../components/admin/Dashboard";
import { AuthProvider } from "../context/AuthProvider";
import { CvRegistrada } from "../components/user_cv/CvRegistrada";
import { CvModificada } from "../components/user_cv/CvModificada";
import { ReactivarCv } from "../components/user_cv/ReactivarCv";
import {Logout} from "../components/user/Logout";
import {ListarCv} from "../components/admin/ListarCv"
import { VerCvRegistrada } from "../components/admin/VerCvRegistrada";
import { AddAreaOcupacion } from "../components/admin/AddAreaOcupacion";

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
            <Route path="logout" element={<Logout/>} />
          </Route>
          {/* Rutas para cargar los componentes del administrador */}
          <Route>
            <Route path="admin" element={<Dashboard />} />
            <Route path="/listar-cv" element={<ListarCv/>}/>
            <Route path="/ver-cv-registrada/:id" element={<VerCvRegistrada/>}/>
            <Route path="/agregar-area-ocupacion" element={<AddAreaOcupacion />} /> {/* Nueva ruta */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
