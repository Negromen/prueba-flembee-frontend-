import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/user/thunks";
import { AnyAction } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import * as Yup from "yup"; // Para las validaciones

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9_.-]*$/,
          "Solo se permiten letras, números, puntos, guiones y guiones bajos"
        )
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(20, "El nombre de usuario debe tener máximo 20 caracteres")
        .required("Este campo es obligatorio"),

      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("Este campo es obligatorio"),
    }),
    onSubmit: async (values) => {
      const hashedPassword = CryptoJS.SHA256(values.password.trim()).toString();
      console.log("Hashed password", hashedPassword);

      try {
        const response = await dispatch(
          userLogin({
            username: values.username,
            password: hashedPassword,
          }) as unknown as AnyAction
        );

        // Verifica si la respuesta es exitosa
        if (response?.type === "/user/login/fulfilled") {
          console.log("Login exitoso");
          navigate("/recipes"); // Solo navega si el login fue exitoso
        } else {
          console.error("Error en el login:", response?.payload?.message);
        }
      } catch (error) {
        console.error("Error durante el login:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center px-8">
        <img
          src="/public/LogoCocina.jpg" // Asegúrate de que la ruta sea correcta
          alt="Logo"
          className="h-24 mb-6 mr-4 rounded-sm"
        />
        <h1 className="text-4xl font-extrabold mb-4">Bienvenido a Recetas</h1>
        <p className="text-lg text-center">
          Inicia sesión para explorar las mejores recetas y guardar tus
          favoritas.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-6">
            Iniciar sesión
          </h1>
          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Nombre de usuario
              </label>
              <div className="relative ">
                <input
                  id="username"
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  placeholder="Ingresa tu nombre de usuario"
                  className={`pl-10 form-input w-full border-blue-200 border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formik.touched.username && formik.errors.username
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-red-500 mt-1">
                    {formik.errors.username}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  placeholder="Ingresa tu contraseña"
                  className={`pl-10 form-input w-full border-blue-200 border-2 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Ingresar
            </button>
          </form>
          {formik.isSubmitting && <div>Iniciando sesión...</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
