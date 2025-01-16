export type RecipeBoxState = {
  userID: number;
  recipeID: number;
  loading: boolean; // Estado de carga
  error: string | null; // Error asociado a operaciones del usuario
};
