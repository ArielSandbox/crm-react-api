import React from "react";

const Alerta = ({ children }) => {
  return (
    <div className="text-center my-4 text-white p-3 bg-red-600 uppercase font-bold">
      {children}
    </div>
  );
};

export default Alerta;
