import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userLogout } from "./thunks";
import { UserState } from "./types/UserState";
import { jwtDecode } from "jwt-decode"; // Usamos jwt-decode para decodificar el token
import {
  recipeboxDelete,
  recipeboxRegister,
} from "../../store/favorites/thunks"; // Acción de Redux para eliminar o añadir una receta de favoritos

const initialState: UserState = {
  id: 0,
  username: "",
  firstName: "",
  lastName: "",
  birthdate: "",
  active: true,
  deleted: false,
  firstSession: false,
  lastConnection: null,
  createdAt: "",
  updatedAt: null,
  favoriteRecipes: [],
  token: "",
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log("Login success:", payload);
        // Decodificar el token y asignar la información al estado
        const decodedToken: any = jwtDecode(payload);
        state.token = payload; // Almacenamos el token
        state.id = decodedToken.id;
        state.username = decodedToken.username;
        state.firstName = decodedToken.firstname;
        state.lastName = decodedToken.lastname;
        state.birthdate = decodedToken.birthdate;
        state.active = decodedToken.active;
        state.favoriteRecipes = decodedToken.favorites; // Asignamos las recetas favoritas
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ? (payload as any).message : "Login failed";
      });

    // Eliminar receta de favoritos
    builder
      .addCase(recipeboxDelete.fulfilled, (state, { payload }) => {
        state.favoriteRecipes = payload.updatedFavorites; // Actualiza la lista de recetas favoritas en el estado global
      })
      .addCase(recipeboxDelete.rejected, (state, { payload }) => {
        state.error = payload
          ? (payload as any).message
          : "Error al eliminar receta";
      });

    // Añadir receta a favoritos
    builder
      .addCase(recipeboxRegister.fulfilled, (state, { payload }) => {
        // Añadir la receta completa a la lista de favoritos
        const updatedFavoriteRecipes = [...state.favoriteRecipes, payload];
        state.favoriteRecipes = updatedFavoriteRecipes;
      })
      .addCase(recipeboxRegister.rejected, (state, { payload }) => {
        state.error = payload
          ? (payload as any).message
          : "Error al añadir receta a favoritos";
      });

    // Logout
    builder
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        // Reiniciar el estado al logout
        Object.assign(state, initialState);
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ? (payload as any).message : "Logout failed";
      });
  },
});

export default userSlice.reducer;
