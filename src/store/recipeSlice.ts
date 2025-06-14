import { recipeApi } from "@/lib/recipeApi";
import { Recipe } from "@/types/recipe";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type RecipeState = {
  data: Recipe[] | null;
  loading: boolean;
  error: string | null;
  dialogOpen: boolean;
  toastOpen: boolean;
  currentRecipeId: string;
  currentRecipe: Recipe | null;
  toastMessage?: string;
  searchedQuery?: string;
  searchedIngredient?: string;
};

const initialState: RecipeState = {
  data: null,
  loading: false,
  error: null,
  dialogOpen: false,
  toastOpen: false,
  currentRecipeId: "",
  currentRecipe: null,
  toastMessage: "",
  searchedQuery: "",
  searchedIngredient: "",
};

// Thunks
export const fetchRecipe = createAsyncThunk<Recipe[]>(
  "recipe/fetchRandomRecipe",
  async () => {
    return await recipeApi.searchRecipes("");
  }
);

export const fetchRecipeByName = createAsyncThunk<Recipe[], { query: string }>(
  "recipe/fetchRecipeByName",
  async ({ query }) => {
    return await recipeApi.searchRecipes(query);
  }
);

export const fetchRecipeByIngredient = createAsyncThunk<
  Recipe[],
  { ingredient: string }
>("recipe/fetchRecipeByIngredient", async ({ ingredient }) => {
  return await recipeApi.searchByIngredient(ingredient);
});

export const fetchRecipeDetails = createAsyncThunk<
  Recipe | null,
  { id: string }
>("recipe/fetchRecipeDetails", async ({ id }) => {
  return await recipeApi.getRecipeById(id);
});

const recipe = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.data = action.payload;
    },
    setCurrentRecipeId: (state, action) => {
      state.currentRecipeId = action.payload;
    },
    setDialogOpen: (state, action) => {
      state.dialogOpen = action.payload;
    },
    setToastOpen: (state, action) => {
      state.toastOpen = action.payload;
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSearchedIngredient: (state, action) => {
      state.searchedIngredient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipe.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "No recipe";
      })

      .addCase(fetchRecipeByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipeByName.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRecipeByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "No recipe";
      })

      .addCase(fetchRecipeByIngredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipeByIngredient.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRecipeByIngredient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "No recipe";
      })

      .addCase(fetchRecipeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipeDetails.fulfilled,
        (state, action: PayloadAction<Recipe | null>) => {
          state.loading = false;
          state.currentRecipe = action.payload;
        }
      )
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "No recipe";
      });
  },
});

export const {
  setRecipes,
  setCurrentRecipeId,
  setDialogOpen,
  setToastOpen,
  setToastMessage,
  setSearchedQuery,
  setSearchedIngredient,
} = recipe.actions;

export default recipe.reducer;
