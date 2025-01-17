//import React from "react";

type RecipeCardProps = {
  id: number;
  name: string;
  preparationTime: string;
  difficulty: string;
};

const RecipeCard = ({
  id,
  name,
  preparationTime,
  difficulty,
}: RecipeCardProps) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm">Tiempo de preparación: {preparationTime}</p>
      <p className="text-sm">Dificultad: {difficulty}</p>
      <a
        href={`/recipe/${id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Ver Detalles
      </a>
    </div>
  );
};

export default RecipeCard;
