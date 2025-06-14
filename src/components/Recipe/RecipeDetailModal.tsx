import { useFavorites } from "@/hooks/useFavorites";
import {
  fetchRecipeDetails,
  setCurrentRecipeId,
  setDialogOpen,
} from "@/store/recipeSlice";
import {
  selectCurrentRecipe,
  selectCurrentRecipeId,
  selectDialogOpen,
  selectRecipeLoading,
} from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Recipe } from "@/types/recipe";
import {
  Body,
  BodySmall,
  Button,
  COLORS,
  Column,
  Divider,
  HeadingSmall,
  Icon,
  Overlay,
  RADIUS,
  Row,
  SHADOWS,
  SPACING,
  Tag,
} from "gpdesign";
import Image from "next/image";
import { useEffect } from "react";
import FavoriteButton from "../FavoriteButton.tsx/FavoriteButton";
import Spinner from "../Spinner/Spinner";

const RecipeDetailModal = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectRecipeLoading);
  const isOpen = useAppSelector(selectDialogOpen);
  const currentRecipeId = useAppSelector(selectCurrentRecipeId);
  const currentRecipe = useAppSelector(selectCurrentRecipe);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    if (currentRecipeId) {
      dispatch(fetchRecipeDetails({ id: currentRecipeId }));
    }
  }, [currentRecipeId, dispatch]);

  const isRecipeFavorite = currentRecipe
    ? isFavorite(currentRecipe.idMeal)
    : false;

  const handleFavoriteToggle = () => {
    if (!currentRecipe) return;

    if (isRecipeFavorite) {
      removeFromFavorites(currentRecipe.idMeal);
    } else {
      addToFavorites(currentRecipe);
    }
  };

  const getIngredients = (recipe: Recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || "",
        });
      }
    }
    return ingredients;
  };

  const handleClose = () => {
    dispatch(setCurrentRecipeId(""));
    dispatch(setDialogOpen(false));
  };

  if (!currentRecipe) return null;

  const ingredients = getIngredients(currentRecipe);

  return (
    <Overlay isOpen={isOpen} onClick={handleClose}>
      <Column
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          maxHeight: "800px",
          overflowY: "auto",
        }}
        bg={COLORS.accent100}
        radius={RADIUS.S}
      >
        {loading ? (
          <Column
            align="center"
            justify="center"
            className="gp-p-24"
            style={{ minWidth: "300px", minHeight: "300px" }}
          >
            <Spinner />
            <Body>Loading recipe details...</Body>
          </Column>
        ) : (
          <>
            {/* Header with image */}
            <div className="relative" style={{ minHeight: "300px" }}>
              <Image
                src={currentRecipe.strMealThumb}
                alt={currentRecipe.strMeal}
                fill
                style={{ objectFit: "cover" }}
              />
              {/* Overlay for image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Tags for recipe */}
              <Row
                wrap="wrap"
                gap={SPACING.SP_8}
                className="absolute bottom-4 left-4 right-4"
              >
                <Tag>{currentRecipe.strCategory}</Tag>
                <Tag customColor>{currentRecipe.strArea}</Tag>
              </Row>

              {/* Header buttons */}
              <Row gap={SPACING.SP_8} className="absolute top-4 right-4">
                <FavoriteButton
                  active={isRecipeFavorite}
                  onClick={handleFavoriteToggle}
                ></FavoriteButton>
                <Button
                  iconLeft="faXmark"
                  theme="secondary"
                  onClick={handleClose}
                ></Button>
              </Row>
            </div>

            <Column className="gp-p-24" gap={SPACING.SP_16}>
              {/* Ingredients */}
              <Column gap={SPACING.SP_16}>
                <HeadingSmall tag="h3">
                  <Icon iconName="faCartShopping" color={COLORS.accent200} />{" "}
                  Ingredients ({ingredients.length})
                </HeadingSmall>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {ingredients.map((item, index) => (
                    <Row key={index} gap={SPACING.SP_8} align="center">
                      <Body weight="600">{item.measure}</Body>
                      <Body>{item.ingredient}</Body>
                    </Row>
                  ))}
                </div>
              </Column>

              <Divider />

              {/* Instructions */}
              <Column gap={SPACING.SP_16}>
                <HeadingSmall tag="h3">
                  <Icon iconName="faKitchenSet" color={COLORS.accent200} />{" "}
                  Instructions
                </HeadingSmall>
                <Column gap={SPACING.SP_16}>
                  {currentRecipe.strInstructions
                    .split("\n")
                    .map((step, index) => {
                      if (!step.trim()) return null;
                      return (
                        <Row
                          key={index}
                          bg={COLORS.bgWhite}
                          radius={RADIUS.S}
                          shadow={SHADOWS.S}
                          className="gp-p-8"
                          gap={SPACING.SP_16}
                          justify="center"
                          align="center"
                        >
                          <Column
                            style={{
                              width: "100%",
                              maxWidth: "2rem",
                              height: "2rem",
                            }}
                            className="gp-bg-accent200 "
                            align="center"
                            justify="center"
                            radius={RADIUS.MAX}
                          >
                            <BodySmall color={COLORS.white}>
                              {index + 1}
                            </BodySmall>
                          </Column>
                          <Column flex={1} align="start">
                            <BodySmall className="text-gray-700 leading-relaxed">
                              {step.trim()}
                            </BodySmall>
                          </Column>
                        </Row>
                      );
                    })}
                </Column>
              </Column>

              {/* Additional Info */}
              {currentRecipe.strYoutube && (
                <>
                  <Divider />
                  <Column gap={SPACING.SP_16}>
                    <HeadingSmall tag="h3">
                      <Icon iconName="faLink" color={COLORS.accent200} />{" "}
                      Additional Resources
                    </HeadingSmall>
                    <Row gap={SPACING.SP_16}>
                      {currentRecipe.strYoutube && (
                        <Button
                          iconLeft="faYoutube"
                          iconLeftType="brands"
                          onClick={() =>
                            window.open(currentRecipe.strYoutube, "_blank")
                          }
                        >
                          Watch Video
                        </Button>
                      )}
                    </Row>
                  </Column>
                </>
              )}
            </Column>
          </>
        )}
      </Column>
    </Overlay>
  );
};

export default RecipeDetailModal;
