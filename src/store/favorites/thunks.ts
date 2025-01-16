import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RecipeBoxPayload } from "./types/RecipeBoxPayload";

const backendURL = "http://localhost:5000";

export const recipeboxRegister = createAsyncThunk(
  "/recipebox/create",
  async (payload: RecipeBoxPayload, { rejectWithValue }) => {
    const { ...registerData } = payload;
    try {
      // configurar header's Content-Type como JSON
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "/recipebox/insert",
        registerData,
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
