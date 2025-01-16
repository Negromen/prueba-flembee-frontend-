import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import "./index.css"; // Estilos globales
import { routes } from "./router/routes"; // Asegúrate de que routes es un array de rutas válido

// Crea el objeto router utilizando createBrowserRouter
const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
