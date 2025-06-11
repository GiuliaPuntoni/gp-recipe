"use client";

import Header from "@/components/Header";
import RecipeList from "@/components/Recipe/RecipeList";
import SearchBar from "@/components/SearchBar";
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
    <Column gap={SPACING.SP_16}>
      <Header />
      <SearchBar />
      <RecipeList />
    </Column>
  );
}
