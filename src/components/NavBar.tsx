import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../store/user/thunks"; // Asegúrate de importar el thunk de logout
import { unwrapResult } from "@reduxjs/toolkit"; // Importa unwrapResult

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Despacha el logout y usa unwrapResult para manejar la respuesta correctamente
      const response = await dispatch(userLogout() as any).then(unwrapResult);

      // Si la respuesta es exitosa (code 200), redirige a /login
      if (response?.code === 200) {
        console.log("Logout exitoso");
        navigate("/");
      } else {
        console.error("Error en el logout:", response?.message);
      }
    } catch (error) {
      // Maneja el error si ocurre
      console.error("Error durante el logout:", error);
    }
  };

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-blue-500 text-white">
      <a className="text-3xl font-bold leading-none text-white" href="/">
        Recetas
      </a>
      <div className="lg:hidden">
        <button className="navbar-burger flex items-center text-white p-3">
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <a className="text-sm text-white hover:underline" href="/recipes">
            Ver Recetas
          </a>
        </li>
        <li>
          <a className="text-sm text-white hover:underline" href="/favorites">
            Favoritos
          </a>
        </li>
        <li>
          <a
            className="text-sm text-white hover:underline"
            href="/adminrecipes"
          >
            Administrar Recetas
          </a>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-sm text-blue-500 hover:text-gray-200 hover:underline"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
