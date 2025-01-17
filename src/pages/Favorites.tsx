import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recipeboxDelete } from "../store/favorites/thunks"; // Acción de Redux para eliminar una receta de favoritos
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/NavBar";
import { RecipeBoxPayload } from "../store/favorites/types/RecipeBoxPayload"; // Tipo de Payload
import { AnyAction } from "@reduxjs/toolkit";

const Favorites = () => {
  const dispatch = useDispatch();

  // Acceder a las recetas favoritas y al userID desde el estado global
  const favoriteRecipes = useSelector(
    (state: any) => state.user.favoriteRecipes
  );

  const userID = useSelector((state: any) => state.user.id); // Accedemos correctamente al userID desde el estado global

  const [error, setError] = useState<string | null>(null);

  // Eliminar receta de los favoritos
  const handleRemoveFavorite = async (recipeId: number) => {
    try {
      const recipeBoxPayload: RecipeBoxPayload = {
        userID: userID, // Usamos el userID desde el estado global
        recipeID: recipeId, // El ID de la receta a eliminar
      };

      // Dispatch del thunk para eliminar la receta
      const response = await dispatch(
        recipeboxDelete(recipeBoxPayload) as unknown as AnyAction
      ); // Llamamos al thunk de eliminar receta de favoritos

      // Verificar si la respuesta fue exitosa
      if (response?.type === "/recipebox/delete/fulfilled") {
        console.log("Receta eliminada de favoritos");
      } else {
        setError("Error al eliminar la receta de favoritos");
      }
    } catch (error) {
      setError("Error al eliminar la receta de favoritos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Recetas Favoritas</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteRecipes.map((recipe: any) => (
            <div
              key={recipe.id}
              className="relative bg-white shadow-lg rounded-lg p-4"
            >
              <RecipeCard
                id={recipe.id}
                name={recipe.name}
                preparationTime={recipe.preparationTime}
                difficulty={recipe.difficulty}
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {/* Eliminar botón */}
                <button
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  onClick={() => handleRemoveFavorite(recipe.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
