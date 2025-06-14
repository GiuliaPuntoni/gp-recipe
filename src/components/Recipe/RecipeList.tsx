"use client";
import {
  selectRecipeError,
  selectRecipeLoading,
  selectRecipes,
} from "@/store/selectors";
import { useAppSelector } from "@/store/store";
import {
  Body,
  Button,
  COLORS,
  Column,
  HeadingSmall,
  Hint,
  Icon,
  SPACING,
  STATUS,
} from "gpdesign";
import Spinner from "../Spinner/Spinner";
import RecipeGrid from "./RecipeGrid";

export default function RecipeList() {
  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);

  if (loading)
    return (
      <Column gap={SPACING.SP_24} align="center">
        <Spinner />
        <Body>Loading recipes...</Body>
      </Column>
    );
  if (error) return <Hint status={STATUS.DANGER}>Error: {error}</Hint>;

  if (recipes?.length === 0) {
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

  return <RecipeGrid recipes={recipes} />;
}
