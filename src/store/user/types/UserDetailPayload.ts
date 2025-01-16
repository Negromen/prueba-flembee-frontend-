import { RecipeDetail } from "../../recipes/types/RecipeDetailPayload";

export type UserDetailPayload = {
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
  favoriteRecipes: RecipeDetail[]; // Lista de recetas favoritas del usuario
};
