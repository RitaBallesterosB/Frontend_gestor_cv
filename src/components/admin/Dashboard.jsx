import { Buscador } from "./Buscador";
import { ContenidoDash } from "./ContenidoDash";
import { HeaderAdmin } from "./HeaderAdmin";
import { SideBar } from "./SideBar";
import styles from "./Dashboard.module.css"

export const Dashboard = () => {
  return (
    <div>
      {/* Header de admin */}
      <HeaderAdmin />
      {/* Barra lateral */}
      <SideBar />
      {/* Buscador */}
      <Buscador/>
      {/* Contenido */}
      <ContenidoDash/>
    </div>
  );
};
