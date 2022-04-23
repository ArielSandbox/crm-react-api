import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Formulario from "../components/Formulario";
import Spinner from "../components/Spinner";
import Alerta from "../components/Alerta";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const response = await fetch(url);
        const result = await response.json();

        setCliente(result);
      } catch (error) {
        console.error(error);
      }

      setCargando(false);
    };

    obtenerClienteAPI();
  }, []);

  return (
    <div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-4xl text-blue-900 font-black">Editar Cliente</h1>
          <p className="mt-3">
            Utiliza este formulario para editar datos de un cliente
          </p>

          {cliente?.nombre ? (
            <Formulario cliente={cliente} />
          ) : (
            <Alerta>Cliente ID no válido</Alerta>
          )}
        </>
      )}
    </div>
  );
};

export default EditarCliente;
