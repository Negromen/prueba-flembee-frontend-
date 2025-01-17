import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RecipeBoxPayload } from "./types/RecipeBoxPayload";

const backendURL = "http://localhost:5000";

export const recipeboxRegister = createAsyncThunk(
  "/recipebox/create",
  async (payload: RecipeBoxPayload, { rejectWithValue }) => {
    const { userID, recipeID } = payload;
    try {
      // Configurar header's Content-Type como JSON
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Primero, insertar en la tabla intermedia 'recipe_box'
      await axios.post("/recipebox/insert", { userID, recipeID }, config);

      // Luego, obtener la receta completa
      const response = await axios.get(
        `${backendURL}/recipe/getrecipe/${recipeID}`,
        config
      );

      // Retornar la receta completa
      if (response.status === 200) {
        return response.data; // Receta completa
      }

      return rejectWithValue("Error al obtener la receta");
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const recipeboxDelete = createAsyncThunk(
  "/recipebox/delete",
  async (payload: RecipeBoxPayload, { rejectWithValue }) => {
    const { ...laData } = payload;
    try {
      // configurar header's Content-Type como JSON
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `/recipebox/delete/${laData.userID}/${laData.recipeID}`,
        laData,
        config
      );
      const {
        data: { data },
      } = response;

      if (response.status === 201) {
        return data;
      }
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);
