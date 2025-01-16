export type RecipeDetail = {
  id: number;
  name: string;
  preparationTime: string;
  difficulty: string;
  active: boolean;
  createdAt: string; // Fecha y hora en formato ISO
  updatedAt: string | null; // Puede ser nulo si no se ha actualizado
};
