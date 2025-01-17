import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import Navbar from "../components/NavBar"; // Asegúrate de importar el Navbar

const RecipeList = () => {
  const backendURL = "http://localhost:5000";

  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  //----- CONFIGURACIÓN DE REDUX -----
  // const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${backendURL}/recipe/activerecipes`);
        console.log(response.data);
        setRecipes(response.data);
      } catch (err: any) {
        const error = err as AxiosError<any>;
        if (error.response) {
          setError(error.response.data.message || "Error fetching recipes");
        } else if (error.request) {
          setError("No response received from server");
        } else {
          setError(error.message);
        }
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Recetas Disponibles */}
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Recetas Disponibles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              preparationTime={recipe.preparationTime}
              difficulty={recipe.difficulty}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
