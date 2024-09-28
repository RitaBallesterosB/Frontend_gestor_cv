import { Buscador } from "./Buscador";
import styles from "./Dashboard.module.css";
import { HeaderAdmin } from "./HeaderAdmin";
import { SideBar } from "./SideBar";

export const Dashboard = () => {
  return (
    <>
      {/* Header de admin */}
      <HeaderAdmin />
      {/* Barra lateral */}
      <SideBar />
      {/* Buscador */}
      <Buscador/>
    </>
  );
};
