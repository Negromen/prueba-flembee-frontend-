import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Para las validaciones
import { useDispatch } from "react-redux";
import { recipeRegister } from "../store/recipes/thunks"; // Importar el thunk de crear receta
import Navbar from "../components/NavBar"; // Asegúrate de importar el Navbar
import { RecipeCreatePayload } from "../store/recipes/types/RecipeCreatePayload";
import { AnyAction } from "@reduxjs/toolkit";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState<string | null>(null);

  // Inicializa el formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      preparationTime: "",
      difficulty: "fácil",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras y espacios")
        .required("Este campo es obligatorio"),
      preparationTime: Yup.number()
        .min(0, "El tiempo de preparación no puede ser negativo")
        .required("Este campo es obligatorio"),
      difficulty: Yup.string().required("Selecciona una dificultad"),
    }),
    onSubmit: async (values) => {
      try {
        // Formateamos preparationTime agregando " minutos" al valor numérico antes de enviarlo
        const Recipe: RecipeCreatePayload = {
          name: values.name,
          preparationTime: `${values.preparationTime} minutos`,
          difficulty: values.difficulty,
        };

        // Usamos dispatch para enviar la receta
        const response = await dispatch(
          recipeRegister(Recipe) as unknown as AnyAction
        );

        // Verifica si la respuesta es exitosa
        if (response?.type === "/recipe/create/fulfilled") {
          console.log("Receta creada exitosamente");
          navigate("/adminrecipes"); // Redirige a la lista de recetas
        } else {
          console.error(
            "Error al crear la receta:",
            response?.payload?.message
          );
        }
      } catch (error) {
        setError("Error al crear la receta");
        console.error("Error durante la creación de la receta:", error);
      }
    },
  });

  return (
    <div>
      <Navbar /> {/* Navbar aquí */}
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-md w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-6">
            Crear Receta
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Nombre de la Receta */}
            <div>
              <label htmlFor="name" className="block text-lg font-bold mb-2">
                Nombre de la Receta
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa el nombre de la receta"
                className={`w-full border-2 p-3 rounded-lg ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 mt-1">{formik.errors.name}</div>
              )}
            </div>

            {/* Tiempo de Preparación */}
            <div>
              <label
                htmlFor="preparationTime"
                className="block text-lg font-bold mb-2"
              >
                Tiempo de Preparación (minutos)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="preparationTime"
                  name="preparationTime"
                  value={formik.values.preparationTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Tiempo"
                  className={`w-full sm:w-32 border-2 p-3 rounded-lg ${
                    formik.touched.preparationTime &&
                    formik.errors.preparationTime
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <span className="ml-2 text-lg">minutos</span>
              </div>
              {formik.touched.preparationTime &&
                formik.errors.preparationTime && (
                  <div className="text-red-500 mt-1">
                    {formik.errors.preparationTime}
                  </div>
                )}
            </div>

            {/* Dificultad */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-lg font-bold mb-2"
              >
                Dificultad
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formik.values.difficulty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full border-2 p-3 rounded-lg ${
                  formik.touched.difficulty && formik.errors.difficulty
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="fácil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="difícil">Difícil</option>
              </select>
              {formik.touched.difficulty && formik.errors.difficulty && (
                <div className="text-red-500 mt-1">
                  {formik.errors.difficulty}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all"
              >
                Guardar Receta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
