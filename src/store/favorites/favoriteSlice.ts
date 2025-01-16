import { createSlice } from "@reduxjs/toolkit";
import { recipeboxRegister, recipeboxDelete } from "./thunks";
import { RecipeBoxState } from "./types/RecipeBoxState";

const initialState: RecipeBoxState = {
  userID: 0,
  recipeID: 0,
  loading: false,
  error: null,
};

const recipeBoxSlice = createSlice({
  name: "recipeBox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Caso para registrar una receta en favoritos
      .addCase(recipeboxRegister.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpiar errores previos
      })
      .addCase(recipeboxRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.userID = action.payload.userID;
        state.recipeID = action.payload.recipeID;
        state.error = null;
      })
      .addCase(recipeboxRegister.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error registering recipe in favorites";
      })
      // Caso para eliminar una receta de favoritos
      .addCase(recipeboxDelete.pending, (state) => {
        state.loading = true;
        state.error = null; // Limpiar errores previos
      })
      .addCase(recipeboxDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.userID = 0; // Reiniciar el userID después de la eliminación
        state.recipeID = 0; // Reiniciar el recipeID después de la eliminación
        state.error = null;
      })
      .addCase(recipeboxDelete.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error removing recipe from favorites";
      });
  },
});

export default recipeBoxSlice.reducer;
