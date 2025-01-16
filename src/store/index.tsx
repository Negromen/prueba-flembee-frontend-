import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import recipeSlice from "./recipes/recipeSlice";
import recipeBoxSlice from "./favorites/favoriteSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "favorites"], // Persistir solo auth y favoritos
};

// Combinar los reducers en un reducer raíz
const rootReducer = combineReducers({
  user: userSlice,
  recipes: recipeSlice,
  favorites: recipeBoxSlice,
});

// Crear el reducer persistente usando la configuración de persistencia y el reducer raíz
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store de Redux
export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk],
});

// Tipos para el estado raíz y el despacho
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Crear el persistor
export const persistor = persistStore(store);
