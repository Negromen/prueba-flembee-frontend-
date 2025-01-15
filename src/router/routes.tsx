import { lazy } from "react";

// Importación de componentes de forma lazy
const Home = lazy(() => import("../pages/Home"));
const RecipeList = lazy(() => import("../pages/RecipeList")); // Nueva ruta para ver todas las recetas
const RecipeDetail = lazy(() => import("../pages/RecipeDetail"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));

const routes = [
  {
    path: "/", // Ruta principal para la página de inicio
    element: <Home />,
  },
  {
    path: "/recipes", // Ruta para ver todas las recetas
    element: <RecipeList />,
  },
  {
    path: "/recipe/:id", // Ruta para ver el detalle de una receta específica
    element: <RecipeDetail />,
  },
  {
    path: "/favorites", // Ruta para la caja de recetas favoritas del usuario
    element: <Favorites />,
  },
  {
    path: "/login", // Ruta para iniciar sesión
    element: <Login />,
  },
  {
    path: "*", // Ruta para manejar rutas no encontradas
    element: <NotFound />,
  },
];

export { routes };
