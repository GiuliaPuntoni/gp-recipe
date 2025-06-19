"use client";

import Header from "@/components/Header";
import RecipeList from "@/components/Recipe/RecipeList";
import SearchedResultsBox from "@/components/SearchedResultsBox";
import {
  fetchRecipe,
  setCurrentRecipeId,
  setDialogOpen,
} from "@/store/recipeSlice";
import { useAppDispatch } from "@/store/store";
import { Column, SPACING } from "gpdesign";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HomePageComponent() {
  const dispatch = useAppDispatch();
  const queryParam = useSearchParams();
  const query = queryParam.get("recipeid");
  useEffect(() => {
    dispatch(fetchRecipe());

    console.log("query", query);
    if (query) {
      dispatch(setCurrentRecipeId(query));
      dispatch(setDialogOpen(true));
    }
  }, [dispatch]);

  return (
    <Column gap={SPACING.SP_8} m={{ gap: SPACING.SP_32 }}>
      {/* Header */}
      <Header />
      <SearchedResultsBox />
      {/* List of Recipes */}
      <RecipeList />
    </Column>
  );
}
