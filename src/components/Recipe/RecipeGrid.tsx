"use client";

import { Recipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[] | null;
}

const RecipeGrid = ({ recipes = [] }: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gp-pb-128 gp-m-pb-0">
      {recipes?.map((recipe, index) => (
        <div key={`${index}-${recipe.idMeal}`}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
