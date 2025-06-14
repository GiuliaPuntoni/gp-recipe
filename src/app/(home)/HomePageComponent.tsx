"use client";

import Header from "@/components/Header";
import RecipeList from "@/components/Recipe/RecipeList";
import SearchedResultsBox from "@/components/SearchedResultsBox";
import { fetchRecipe } from "@/store/recipeSlice";
import { useAppDispatch } from "@/store/store";
import { Column, SPACING } from "gpdesign";
import { useEffect } from "react";

export default function HomePageComponent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecipe());
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
