import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar"; // Asegúrate de importar el Navbar

const AdminRecipes = () => {
  const backendURL = "http://localhost:5000";
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${backendURL}/recipe/recipes`);
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${backendURL}/recipe/delete/${id}`);

      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (err: any) {
      alert("Error deleting recipe");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* Navbar aquí */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Administrar Recetas
        </h1>

        <div className="mb-6 text-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
            onClick={() => navigate("/recipecreate")}
          >
            Agregar Nueva Receta
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg p-4"
            >
              <RecipeCard
                id={recipe.id}
                name={recipe.name}
                preparationTime={recipe.preparationTime}
                difficulty={recipe.difficulty}
              />

              <div className="absolute bottom-4 right-4 flex space-x-2">
                {/* Editar botón */}
                <button
                  className="mb-1 mr-2  px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                  onClick={() => navigate(`/recipeedit/${recipe.id}`)}
                >
                  Editar
                </button>

                {/* Eliminar botón */}
                <button
                  className="mb-1 mr-4 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  onClick={() => handleDelete(recipe.id)}
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

export default AdminRecipes;
