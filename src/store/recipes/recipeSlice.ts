import { createSlice } from "@reduxjs/toolkit";
import { recipeRegister, recipeUpdate, recipeDelete } from "./thunks";
import { RecipeState } from "./types/RecipeState";

const initialState: RecipeState = {
  id: 0,
  name: "",
  preparationTime: "",
  difficulty: "",
  active: true,
  createdAt: "",
  updatedAt: null,
  loading: false,
  error: null,
  recipes: [], // Lista de recetas favoritas cargadas del usuario
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    // Reducers sincronizados si es necesario
  },
  extraReducers: (builder) => {
    // Casos para crear una receta
    builder
      .addCase(recipeRegister.pending, (state) => {
        state.loading = true;
        state.error = null; // Reinicia el error en cada petición
      })
      .addCase(recipeRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload); // Agrega la nueva receta a la lista de recetas
      })
      // Rejected case for recipeRegister
      .addCase(recipeRegister.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error creating recipe";
      });

    // Casos para actualizar una receta
    builder
      .addCase(recipeUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recipeUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(
          (recipe) => recipe.id === action.payload.id
        );
        if (index !== -1) {
          state.recipes[index] = action.payload; // Actualiza la receta en la lista de recetas
        }
      })
      // Rejected case for recipeUpdate
      .addCase(recipeUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error updating recipe";
      });

    // Casos para eliminar una receta
    builder
      .addCase(recipeDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recipeDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = state.recipes.filter(
          (recipe) => recipe.id !== action.payload.id
        ); // Elimina la receta de la lista de recetas
      })
      // Rejected case for recipeDelete
      .addCase(recipeDelete.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error deleting recipe";
      });
  },
});

export default recipeSlice.reducer;
