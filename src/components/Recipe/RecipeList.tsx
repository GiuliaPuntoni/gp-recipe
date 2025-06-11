"use client";
import {
  selectRecipeError,
  selectRecipeLoading,
  selectRecipes,
} from "@/store/selectors";
import { useAppSelector } from "@/store/store";
import { Button, COLORS, Column, HeadingSmall, Icon, SPACING } from "gpdesign";
import RecipeGrid from "./RecipeGrid";

export default function RecipeList() {
  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);

  if (loading) return <p>Loading recipes...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!recipes || recipes.length === 0) {
    return (
      <Column align="center" gap={SPACING.SP_24}>
        <Icon
          iconName="faHeartCrack"
          style={{ fontSize: "50px" }}
          color={COLORS.accent200}
        />
        <HeadingSmall>No results found</HeadingSmall>
        <Button onClick={() => location.reload()}>Try again</Button>
      </Column>
    );
  }

  return (
    <RecipeGrid recipes={recipes} onRecipeClick={() => console.log("click")} />
  );
}
