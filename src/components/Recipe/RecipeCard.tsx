"use client";

import {
  Body,
  BodyExtraSmall,
  COLORS,
  Column,
  Divider,
  RADIUS,
  RADIUS_VALUES,
  Row,
  SHADOWS,
  SIZES,
  SPACING,
  Tag,
} from "gpdesign";
import React from "react";

import { useFavorites } from "@/hooks/useFavorites";
import { setCurrentRecipeId, setDialogOpen } from "@/store/recipeSlice";
import { useAppDispatch } from "@/store/store";
import { Recipe } from "@/types/recipe";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const dispatch = useAppDispatch();

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isRecipeFavorite = isFavorite(recipe.idMeal);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRecipeFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleClick = () => {
    dispatch(setCurrentRecipeId(recipe.idMeal));
    dispatch(setDialogOpen(true));
  };

  return (
    <Column
      bg={COLORS.bgWhite}
      radius={RADIUS.S}
      onClick={handleClick}
      pointer
      shadow={SHADOWS.S}
    >
      <div className="relative">
        <Column
          className="absolute opacity-0 hover:opacity-30 gp-radius-s"
          style={{ width: "100%", height: "100%" }}
          bg={COLORS.black}
        />
        <Image
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          width={400}
          height={300}
          className="w-full h-48 object-cover "
          priority
          style={{
            borderRadius: `${RADIUS_VALUES.SM} ${RADIUS_VALUES.SM} 0 0`,
          }}
        />
        <FavoriteButton
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3"
          active={isRecipeFavorite}
        />
      </div>

      <Column
        className="gp-p-16"
        gap={SPACING.SP_4}
        justify="space-between"
        style={{ minHeight: "210px" }}
      >
        <Body tag="h2" weight="600" className="line-clamp-2">
          {recipe.strMeal}
        </Body>

        <Row gap={SPACING.SP_8}>
          {recipe.strCategory && <Tag size={SIZES.S}>{recipe.strCategory}</Tag>}
          {recipe.strArea && (
            <Tag customColor size={SIZES.S}>
              {recipe.strArea}
            </Tag>
          )}
        </Row>

        <BodyExtraSmall className="line-clamp-3">
          {recipe.strInstructions
            ? recipe.strInstructions.substring(0, 120) +
              (recipe.strInstructions.length > 120 ? "..." : "")
            : "Click to view full recipe details and cooking instructions."}
        </BodyExtraSmall>

        <Divider />
        <BodyExtraSmall weight="600">
          Click to view full recipe →
        </BodyExtraSmall>
      </Column>
    </Column>
  );
};

export default RecipeCard;
