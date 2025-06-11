import { RootState } from "./store";

export const selectRecipesState = (state: RootState) => state.recipes;

export const selectRecipes = (state: RootState) => state.recipes.data;
export const selectRecipeLoading = (state: RootState) => state.recipes.loading;
export const selectRecipeError = (state: RootState) => state.recipes.error;
