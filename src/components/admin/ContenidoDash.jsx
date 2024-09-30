import { Buscador } from "./Buscador";
import Card from "./Card";
import styles from './Dashboard.module.css'
import { ResultadosBuscador } from "./ResultadosBuscador";
import { useState } from "react";

export const ContenidoDash = () => {
  const [mostrarResultados, setMostrarResultados] = useState(false);
	const [resultadosBuscador, setResultadosBuscador] = useState(null);

  const handleMostrarResultados = () => {
		setMostrarResultados(true);
	};

	const handleResultadosBuscador = (results) => {
		setResultadosBuscador(results);
		setMostrarResultados(true); // Mostrar resultados al recibir la data
	  };
	
	  const funciones = {
		handleMostrarResultados: handleMostrarResultados,
		onRealizarBusqueda: handleResultadosBuscador,
	  };

  return (
    <div className={styles.contenidoDash}>
      <Buscador funciones={funciones}/>
			{mostrarResultados && <ResultadosBuscador results={resultadosBuscador} />}
      <Card />
    </div>
  );
};
