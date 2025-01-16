import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { RecipeCreatePayload } from "./types/RecipeCreatePayload";
import { RecipeDeletePayload } from "./types/RecipeDeletePayload";
import { RecipeUpdatePayload } from "./types/RecipeUpdatePayload";

const backendURL = "http://localhost:5000";

export const recipeRegister = createAsyncThunk(
  "/recipe/create",
  async (payload: RecipeCreatePayload, { rejectWithValue }) => {
    const { ...registerData } = payload;
    try {
      // configurar header's Content-Type como JSON
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/recipe/create", registerData, config);
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

export const recipeUpdate = createAsyncThunk(
  "/recipe/update",
  async (payload: RecipeUpdatePayload, { rejectWithValue }) => {
    const { ...updateData } = payload;
    try {
      // configurar header's Content-Type como JSON
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `/recipe/update/${updateData.id}`,
        updateData,
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

export const recipeDelete = createAsyncThunk(
  "/recipe/delete",
  async (payload: RecipeDeletePayload, { rejectWithValue }) => {
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
        `/recipe/update/${laData.id}`,
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
