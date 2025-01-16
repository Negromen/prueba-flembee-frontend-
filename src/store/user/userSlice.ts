import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, userLogout } from "./thunks";
import { UserState } from "./types/UserState";

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
        state.id = payload.id;
        state.username = payload.username;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.birthdate = payload.birthdate;
        state.active = payload.active;
        state.deleted = payload.deleted;
        state.firstSession = payload.firstSession;
        state.lastConnection = payload.lastConnection;
        state.createdAt = payload.createdAt;
        state.updatedAt = payload.updatedAt;
        state.favoriteRecipes = payload.favoriteRecipes || [];
        state.token = payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ? (payload as any).message : "Login failed";
      });

    // Register
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload
          ? (payload as any).message
          : "Registration failed";
      });

    // Logout
    builder
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        // Reinicia el estado del usuario al inicial
        Object.assign(state, initialState);
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ? (payload as any).message : "Error desconocido";
      });
  },
});

export default userSlice.reducer;
