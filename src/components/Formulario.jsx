import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";

const Formulario = ({ cliente }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre del cliente es obligatorio")
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo"),
    empresa: Yup.string().required("el nombre de la empresa es obligatorio"),
    email: Yup.string()
      .required("El email es obligatorio")
      .email("Debe ser un email válido"),
    telefono: Yup.number()
      .positive("El número no es válido. Coloque sólo números")
      .integer("El número no es válido. Coloque sólo números")
      .typeError("El número no es válido. Coloque sólo números"),
    notas: Yup.string(),
  });

  const handleSubmit = async (valores) => {
    try {
      let url = "http://localhost:4000/clientes";
      let method = "POST";

      if (cliente.id) {
        url += `/${cliente.id}`;
        method = "PUT";
      }

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valores),
      });

      navigate("/clientes");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white mt-10 rounded-md px-5 py-10 shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {Object.keys(cliente).length ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="mt-10">
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="nombre">
                Nombre:
              </label>
              <Field
                id="nombre"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 border-2 border-blue-100 rounded-md "
                placeholder="Nombre del Cliente"
                name="nombre"
              />
              {errors.nombre && touched.nombre && (
                <Alerta>{errors.nombre}</Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="empresa">
                Empresa:
              </label>
              <Field
                id="empresa"
                name="empresa"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 border-2 border-blue-100 rounded-md "
                placeholder="Empresa del Cliente"
              />
              {errors.empresa && touched.empresa && (
                <Alerta>{errors.empresa}</Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="email">
                E-mail:
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-2 block w-full p-3 bg-gray-50 border-2 border-blue-100 rounded-md "
                placeholder="Email del Cliente"
              />
              {errors.email && touched.email && <Alerta>{errors.email}</Alerta>}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="telefono">
                Teléfono:
              </label>
              <Field
                id="telefono"
                name="telefono"
                type="tel"
                className="mt-2 block w-full p-3 bg-gray-50 border-2 border-blue-100 rounded-md "
                placeholder="Teléfono del Cliente"
              />
              {errors.telefono && touched.telefono && (
                <Alerta>{errors.telefono}</Alerta>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="notas">
                Notas:
              </label>
              <Field
                as="textarea"
                id="notas"
                name="notas"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 border-2 border-blue-100 rounded-md h-40"
                placeholder="Notas del Cliente"
              />
            </div>
            <input
              type="submit"
              value={
                Object.keys(cliente).length
                  ? "Editar Cliente"
                  : "Agregar Cliente"
              }
              className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
};

export default Formulario;
