import { lazy } from "react";

// Importación de componentes de forma lazy
const RecipeList = lazy(() => import("../pages/RecipeList")); // Nueva ruta para ver todas las recetas
const RecipeDetail = lazy(() => import("../pages/RecipeDetail"));
const AdminRecipes = lazy(() => import("../pages/AdminRecipes"));
const RecipeEdit = lazy(() => import("../pages/RecipeEdit"));
const RecipeCreate = lazy(() => import("../pages/RecipeCreate"));
const Login = lazy(() => import("../pages/Login"));
const Favorites = lazy(() => import("../pages/Favorites"));
/*
const NotFound = lazy(() => import("../pages/NotFound"));
*/

const routes = [
  {
    path: "/", // Ruta principal para la página de inicio
    element: <Login />,
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
    path: "/recipecreate", // Ruta para ver el detalle de una receta específica
    element: <RecipeCreate />,
  },
  {
    path: "/recipeedit/:id", // Ruta para ver el detalle de una receta específica
    element: <RecipeEdit />,
  },
  {
    path: "/adminrecipes", // Ruta para ver el detalle de una receta específica
    element: <AdminRecipes />,
  },
  {
    path: "/favorites", // Ruta para la caja de recetas favoritas del usuario
    element: <Favorites />,
  },
  /*
  {
    path: "*", // Ruta para manejar rutas no encontradas
    element: <NotFound />,
  },
  */
];

export { routes };
