import { RecipeDetail } from "../../recipes/types/RecipeDetailPayload";

export type RecipeState = {
  id: number;
  name: string;
  preparationTime: string;
  difficulty: string;
  active: boolean;
  createdAt: string; // Fecha y hora en formato ISO
  updatedAt: string | null; // Puede ser nulo si no se ha actualizado
  loading: boolean; // Estado de carga
  error: string | null; // Error asociado a operaciones del usuario
  recipes: RecipeDetail[]; // Lista de recetas favoritas cargadas del usuario
};
