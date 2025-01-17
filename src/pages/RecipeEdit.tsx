import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup"; // Para las validaciones
import Navbar from "../components/NavBar"; // Asegúrate de importar el Navbar
import { useDispatch } from "react-redux";
import { recipeUpdate } from "../store/recipes/thunks"; // Asegúrate de importar tu thunk
import { RecipeUpdatePayload } from "../store/recipes/types/RecipeUpdatePayload";
import { AnyAction } from "@reduxjs/toolkit";

const EditRecipe = () => {
  const backendURL = "http://localhost:5000";
  const { id } = useParams(); // Obtiene el ID de la receta desde la URL
  const elidNumber: number = Number(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState({
    name: "",
    preparationTime: "",
    difficulty: "fácil",
    active: true, // Valor inicial para el campo de activar receta
  });
  const [error, setError] = useState<string | null>(null);

  // Obtener los detalles de la receta para editar
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/recipe/getrecipe/${elidNumber}`
        );
        console.log(response.data);

        // Extraemos solo el número de la cadena de tiempo (por ejemplo, "30 minutos" -> "30")
        const preparationTime = response.data.preparationTime.replace(
          /[^0-9]/g,
          ""
        );

        setRecipe({
          name: response.data.name,
          preparationTime: preparationTime, // Asignamos solo el número
          difficulty: response.data.difficulty,
          active: response.data.active, // Asignamos el estado activo de la receta
        });
      } catch (err: any) {
        const error = err as AxiosError<any>;
        if (error.response) {
          setError(
            error.response.data.message || "Error fetching recipe details"
          );
        } else if (error.request) {
          setError("No response received from server");
        } else {
          setError(error.message);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  // Este efecto se ejecuta cuando los datos de la receta se cargan
  useEffect(() => {
    if (recipe) {
      formik.setValues({
        name: recipe.name,
        preparationTime: recipe.preparationTime,
        difficulty: recipe.difficulty,
        active: recipe.active, // Asignamos el estado activo en el formulario
      });
    }
  }, [recipe]);

  // Inicializa el formulario con Formik
  const formik = useFormik({
    initialValues: {
      name: recipe.name,
      preparationTime: recipe.preparationTime,
      difficulty: recipe.difficulty,
      active: recipe.active, // Campo para manejar la activación de la receta
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras y espacios")
        .required("Este campo es obligatorio"),
      preparationTime: Yup.number()
        .min(0, "El tiempo de preparación no puede ser negativo")
        .required("Este campo es obligatorio"),
      difficulty: Yup.string().required("Selecciona una dificultad"),
      active: Yup.boolean().required("Este campo es obligatorio"), // Validación para el campo de activación
    }),
    onSubmit: async (values) => {
      try {
        // Formateamos preparationTime agregando " minutos" al valor numérico antes de enviarlo
        const updatedRecipe: RecipeUpdatePayload = {
          id: elidNumber,
          name: values.name,
          preparationTime: values.preparationTime,
          difficulty: values.difficulty,
          active: values.active, // Agregamos el valor de activación
        };

        const response = await dispatch(
          recipeUpdate(updatedRecipe) as unknown as AnyAction
        );

        // Verifica si la respuesta es exitosa
        if (response?.type === "/recipe/update/fulfilled") {
          console.log("Receta actualizada exitosamente");
          navigate("/adminrecipes"); // Redirige a la lista de recetas
        } else {
          console.error(
            "Error al actualizar la receta:",
            response?.payload?.message
          );
        }
      } catch (error) {
        setError("Error al actualizar la receta");
        console.error("Error durante la actualización de la receta:", error);
      }
    },
  });

  return (
    <div>
      <Navbar /> {/* Navbar aquí */}
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="container mx-auto p-8 bg-white shadow-lg rounded-md w-full max-w-lg">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-6">
            Editar Receta
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

            {/* Activar Receta */}
            <div>
              <label htmlFor="active" className="block text-lg font-bold mb-2">
                Activar Receta
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formik.values.active}
                  onChange={(e) =>
                    formik.setFieldValue("active", e.target.checked)
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-lg">
                  {formik.values.active ? "Sí" : "No"}
                </span>
              </div>
              {formik.touched.active && formik.errors.active && (
                <div className="text-red-500 mt-1">{formik.errors.active}</div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
