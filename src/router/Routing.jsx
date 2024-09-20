import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Cv } from "../components/user_cv/Cv";
import {PublicLayout} from '../components/layouts/public/PublicLayout';
import { HeaderPub } from "../components/layouts/public/HeaderPub";
import { Dashboard } from "../components/admin/Dashboard";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para cargar los componentes de la ruta pública */}
        <Route>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
        {/* Rutas para cargar los componentes de la ruta privada */}
        <Route>
            <Route path="cv" element={<Cv/>}/>
        </Route>
        {/* Rutas para cargar los componentes del administrador */}
        <Route>
          <Route path="admin" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
