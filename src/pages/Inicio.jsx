import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const response = await fetch(url);
        const result = await response.json();

        setClientes(result);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerClientesAPI();
  }, []);

  const handleEliminar = async (id) => {
    const confirmar = confirm("Deseas eliminar este cliente?");
    if (!confirmar) return;

    try {
      const url = `http://localhost:4000/clientes/${id}`;
      await fetch(url, {
        method: "DELETE",
      });

      const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
      setClientes(arrayClientes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-blue-900 font-black">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              cliente={cliente}
              key={cliente.id}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
