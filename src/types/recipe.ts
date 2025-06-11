export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export interface RecipeSearchResponse {
  meals: Recipe[] | null;
}

export interface FavoriteRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  dateAdded: string;
}

export interface SearchFilters {
  category: string;
  area: string;
}
