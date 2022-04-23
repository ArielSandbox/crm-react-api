import { Outlet } from "react-router-dom";
import useRouterLink from "../hooks/useRouterLink";

const Layout = () => {
  const LinkClientes = useRouterLink("/clientes", "Clientes");
  const LinkNuevoCliente = useRouterLink("/clientes/nuevo", "Nuevo Cliente");

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          CRM - Clientes
        </h2>
        <nav className="mt-10">
          <LinkClientes />
          <LinkNuevoCliente />
        </nav>
      </div>

      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        {/* Injects in the outlet the contents of any child route in the BrowserRouter */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
