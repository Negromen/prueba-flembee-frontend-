import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { recipeboxRegister } from "../store/favorites/thunks"; // Acción de Redux para añadir a favoritos
import { RecipeBoxPayload } from "../store/favorites/types/RecipeBoxPayload"; // Interfaz
import Navbar from "../components/NavBar"; // Asegúrate de importar el Navbar
import axios, { AxiosError } from "axios";
import { AnyAction } from "@reduxjs/toolkit";

const RecipeDetail = () => {
  const { id } = useParams(); // Obtén el ID de la receta desde los parámetros de la URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backendURL = "http://localhost:5000";

  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Obtén el userID desde el estado global del usuario
  const userId = useSelector((state: any) => state.user.id); // El userID lo extraemos del estado global

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${backendURL}/recipe/getrecipe/${id}`);
      setRecipe(response.data);
    } catch (err) {
      const error = err as AxiosError<any>;
      setError(error.message || "Error fetching recipe details");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  // Función para añadir a favoritos
  const handleAddToFavorites = async () => {
    try {
      const recipeBoxPayload: RecipeBoxPayload = {
        userID: userId, // Accede al userID del estado global
        recipeID: recipe.id, // ID de la receta que se quiere agregar a favoritos
      };

      // Enviar al backend para agregar la receta a favoritos
      const response = await dispatch(
        recipeboxRegister(recipeBoxPayload) as unknown as AnyAction
      );

      // Verifica si la respuesta es exitosa
      if (response?.type === "/recipebox/create/fulfilled") {
        console.log("Receta añadida a favoritos");
        navigate("/recipes"); // Redirige a la lista de recetas después de añadirla
      } else {
        console.error(
          "Error al agregar receta a favoritos:",
          response?.payload?.message
        );
        setError("Error al agregar receta a favoritos");
      }
    } catch (err) {
      console.error("Error al agregar receta a favoritos:", err);
      setError("Error al agregar receta a favoritos");
    }
  };

  return (
    <div>
      <Navbar /> {/* Navbar aquí */}
      <div className="container mx-auto p-8">
        {error && <p className="text-red-500">{error}</p>}
        {recipe && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{recipe.name}</h2>
            <p>Tiempo de preparación: {recipe.preparationTime}</p>
            <p>Dificultad: {recipe.difficulty}</p>

            {/* Información Nutricional */}
            {recipe.nutritionalInfo && (
              <div className="mt-4">
                <h3 className="font-bold text-lg">Información Nutricional</h3>
                <ul className="list-disc pl-5">
                  <li>Calorías: {recipe.nutritionalInfo.calories}</li>
                  <li>Proteínas: {recipe.nutritionalInfo.protein}</li>
                  <li>Grasas: {recipe.nutritionalInfo.fat}</li>
                  <li>Carbohidratos: {recipe.nutritionalInfo.carbohydrates}</li>
                  <li>Porciones: {recipe.nutritionalInfo.porcions}</li>
                  <li>
                    Unidad de medida: {recipe.nutritionalInfo.measurementUnit}
                  </li>
                </ul>
              </div>
            )}

            {/* Ingredientes */}
            <div className="mt-4">
              <h3 className="font-bold text-lg">Ingredientes</h3>
              <ul className="list-disc pl-5">
                {recipe.ingredients.map((ingredient: any) => (
                  <li key={ingredient.id}>
                    {ingredient.name} - {ingredient.quantity} gramos
                  </li>
                ))}
              </ul>
            </div>

            {/* Instrucciones */}
            <div className="mt-4">
              <h3 className="font-bold text-lg">Instrucciones</h3>
              <ol className="list-decimal pl-5">
                {recipe.instructions.map((instruction: any) => (
                  <li key={instruction.id}>
                    {instruction.stepNumber}. {instruction.description}
                  </li>
                ))}
              </ol>
            </div>

            {/* Botón Añadir a Favoritos */}
            <button
              onClick={handleAddToFavorites}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Añadir a Favoritos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
