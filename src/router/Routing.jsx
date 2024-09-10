import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { HeaderPub } from "../components/layouts/public/HeaderPub";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas para cargar los componentes de la ruta pública */}
        <Route>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
        </Route>
        {/* Rutas para cargar los componentes de la ruta pública */}
        <Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
