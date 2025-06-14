import { RootState } from "./store";

export const selectRecipesState = (state: RootState) => state.recipes;

export const selectRecipes = (state: RootState) => state.recipes.data;
export const selectRecipeLoading = (state: RootState) => state.recipes.loading;
export const selectRecipeError = (state: RootState) => state.recipes.error;

export const selectDialogOpen = (state: RootState) => state.recipes.dialogOpen;
export const selectCurrentRecipeId = (state: RootState) =>
  state.recipes.currentRecipeId;
export const selectCurrentRecipe = (state: RootState) =>
  state.recipes.currentRecipe;

export const selectToastOpen = (state: RootState) => state.recipes.toastOpen;
export const selectToastMessage = (state: RootState) =>
  state.recipes.toastMessage;

export const selectSerchedQuery = (state: RootState) =>
  state.recipes.searchedQuery;
export const selectSerchedIngredient = (state: RootState) =>
  state.recipes.searchedIngredient;
