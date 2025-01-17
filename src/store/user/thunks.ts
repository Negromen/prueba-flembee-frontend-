import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import { UserLoginPayload } from "./types/UserLoginPayload";
import { UserRegisterPayload } from "./types/UserRegisterPayload";

const backendURL = "http://localhost:5000";

export const userLogin = createAsyncThunk(
  "/user/login",
  async ({ username, password }: UserLoginPayload, { rejectWithValue }) => {
    try {
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/user/login",
        { username, password },
        config
      );

      // Asegúrate de que solo el token se pasa
      return response.data.token; // Solo el token
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

export const userRegister = createAsyncThunk(
  "/user/simple-register",
  async (payload: UserRegisterPayload, { rejectWithValue }) => {
    const { ...registerData } = payload;
    try {
      // configurar header's Content-Type como JSON
      const config = {
        baseURL: backendURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/user/register", registerData, config);
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

// Thunk de logout
export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Respuesta exitosa con un mensaje y un código
      return { message: "Logout successful", code: 200 }; // Aquí no usamos rejectWithValue
    } catch (error) {
      // Si ocurre un error, devuelve un mensaje de error y un código
      return rejectWithValue({ message: "Error during logout", code: 500 });
    }
  }
);
