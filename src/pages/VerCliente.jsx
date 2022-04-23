import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const VerCliente = () => {
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
          {Object.keys(cliente).length === 0 ? (
            <p>No hay resultados</p>
          ) : (
            <>
              <h1 className="text-4xl text-blue-900 font-black">
                Ver Cliente: {cliente.nombre}
              </h1>
              <p className="mt-3">Información del Cliente</p>
              <p className="mt-10 text-4xl text-gray-500">
                <span className="text-gray-800 uppercase font-bold">
                  Cliente:{" "}
                </span>
                {cliente.nombre}
              </p>
              <p className="text-2xl mt-4 text-gray-500">
                <span className="text-gray-800 uppercase font-bold">
                  Email:{" "}
                </span>
                {cliente.email}
              </p>
              {cliente.telefono && (
                <p className="text-2xl mt-4 text-gray-500">
                  <span className="text-gray-800 uppercase font-bold">
                    Teléfono:{" "}
                  </span>
                  {cliente.telefono}
                </p>
              )}
              <p className="text-2xl mt-4 text-gray-500">
                <span className="text-gray-800 uppercase font-bold">
                  Empresa:{" "}
                </span>
                {cliente.empresa}
              </p>
              {cliente.notas && (
                <p className="text-2xl mt-4 text-gray-500">
                  <span className="text-gray-800 uppercase font-bold">
                    Notas:{" "}
                  </span>
                  {cliente.notas}
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VerCliente;
