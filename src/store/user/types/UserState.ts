import { RecipeDetail } from "../../recipes/types/RecipeDetailPayload";

export type UserState = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  active: boolean;
  deleted: boolean;
  firstSession: boolean;
  lastConnection: string | null;
  createdAt: string;
  updatedAt: string | null;
  token: string;
  loading: boolean; // Estado de carga
  error: string | null; // Error asociado a operaciones del usuario
  favoriteRecipes: RecipeDetail[]; // Lista de recetas favoritas cargadas del usuario
};
