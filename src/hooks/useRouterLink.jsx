import { Link, useLocation } from "react-router-dom";

const useRouterLink = (ruta, nombre) => {
  const location = useLocation();
  const urlActual = location.pathname;

  const getLinkClass = (ruta) =>
    `${
      urlActual === ruta ? "text-blue-300" : "text-white"
    } text-2xl block mt-2 hover:text-blue-300 transition-colors duration-200`;

  const ReactLink = () => (
    <Link className={getLinkClass(ruta)} to={ruta}>
      {nombre}
    </Link>
  );

  return ReactLink;
};

export default useRouterLink;
