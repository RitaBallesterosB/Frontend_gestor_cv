import { useState } from "react";

export const useForm = (initialObj = {}) => {
  // Hook para manejar el estado del formulario
  const [form, setForm] = useState(initialObj);

  // Método que recibe un target que a su vez va a recibir un input
  const changed = ({ target }) => {
    const { name, type, value, files } = target;

    // Si el input es de tipo 'file', guardamos el archivo, no el valor
    if (type === "file") {
      setForm({
        ...form,
        [name]: files[0] // Guardamos el primer archivo (asumiendo que no es múltiple)
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  // Método para resetear el formulario a su estado inicial
  const resetForm = (newValues) => {
    setForm(newValues);
  };

  return {
    form,
    changed,
    resetForm
  };
};
