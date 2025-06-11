"use client";

import {
  Body,
  BodyExtraSmall,
  Button,
  COLORS,
  Column,
  Divider,
  RADIUS,
  RADIUS_VALUES,
  Row,
  SIZES,
  SPACING,
  Tag,
} from "gpdesign";
import React from "react";

import { useFavorites } from "@/hooks/useFavorites";
import { Recipe } from "@/types/recipe";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  className?: string;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
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

  return (
    <Column bg={COLORS.bgWhite} radius={RADIUS.S} onClick={onClick} pointer>
      <div className="relative">
        <Column
          className="absolute opacity-0 hover:opacity-30"
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

        <Button
          iconLeft="faHeart"
          iconLeftType={isRecipeFavorite ? "solid" : "regular"}
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3"
        ></Button>
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
          <Tag theme="secondary" size={SIZES.S}>
            {recipe.strCategory}
          </Tag>
          <Tag theme="secondary" size={SIZES.S}>
            {recipe.strArea}
          </Tag>
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
