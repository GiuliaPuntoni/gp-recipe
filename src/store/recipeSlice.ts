import { recipeApi } from "@/lib/recipeApi";
import { Recipe } from "@/types/recipe";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type RecipeState = {
  data: Recipe[] | [];
  loading: boolean;
  error: string | null;
};

const initialState: RecipeState = {
  data: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchRecipe = createAsyncThunk<Recipe[]>(
  "recipe/fetchRandomRecipe",
  async () => {
    return await recipeApi.getRandomRecipes(8);
  }
);

export const fetchRecipieByName = createAsyncThunk<Recipe[], { query: string }>(
  "recipe/fetchRecipieByName",
  async ({ query }) => {
    return await recipeApi.searchRecipes(query);
  }
);

const recipe = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.data = action.payload;
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

      .addCase(fetchRecipieByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRecipieByName.fulfilled,
        (state, action: PayloadAction<Recipe[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchRecipieByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "No recipe";
      });
  },
});

export const { setRecipes } = recipe.actions;
export default recipe.reducer;
