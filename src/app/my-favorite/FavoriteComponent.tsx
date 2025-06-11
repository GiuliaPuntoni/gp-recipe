"use client";

import Header from "@/components/Header";
import RecipeList from "@/components/Recipe/RecipeList";
import { useFavorites } from "@/hooks/useFavorites";
import { setRecipes } from "@/store/recipeSlice";
import { useAppDispatch } from "@/store/store";
import { Column, SPACING } from "gpdesign";
import { useEffect } from "react";

export default function FavoriteComponent() {
  const { favorites } = useFavorites();
  const dispatch = useAppDispatch();
  console.log("favorites", favorites);

  useEffect(() => {
    dispatch(setRecipes(favorites));
  }, [favorites, dispatch]);

  return (
    <Column gap={SPACING.SP_16}>
      <Header isFavoritePage />
      <RecipeList />
    </Column>
  );
}
