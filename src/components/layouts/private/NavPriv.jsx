import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";



const NavPriv = () => {
    const { auth } = useAuth();
  
    // Asumimos que auth tiene la siguiente estructura
    // { token, nombre, apellido, imagen_perfil, initials }
  
    return (
      <nav className="nav-priv">
        <ul className="nav-menu">
          <li>
            <NavLink to="/ver-cv" activeClassName="active">Ver Datos CV Registrada</NavLink>
          </li>
          <li>
            <NavLink to="/modificar-cv" activeClassName="active">Modificar los datos del CV</NavLink>
          </li>
          <li>
            <NavLink to="/desactivar-cv" activeClassName="active">Desactivar Hoja de Vida</NavLink>
          </li>
        </ul>
  
        <div className="nav-right user-profile">
          <img 
            src={auth.imagen_perfil ? `/assets/img/${auth.imagen_perfil}` : '/assets/img/default.png'} 
            
            alt="Foto de perfil" 
            className="user-photo" 
          />
          <span className="user-name">{`${auth.nombre} ${auth.apellido}`}</span>
          <span className="user-initials">{auth.initials}</span>
        </div>
      </nav>
    );
  };
  
  export default NavPriv;