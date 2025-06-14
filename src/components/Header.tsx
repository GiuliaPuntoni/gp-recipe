"use client";

import {
  Body,
  Button,
  COLORS,
  Column,
  Divider,
  Flex,
  HeadingMedium,
  RADIUS,
  SHADOWS,
  SPACING,
} from "gpdesign";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Header = ({ isFavoritePage }: { isFavoritePage?: boolean }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const goToFavorite = () => {
    setLoading(true);
    router.push("/my-favorite");
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    <Column
      tag="header"
      bg={COLORS.bgWhite}
      radius={RADIUS.M}
      shadow={SHADOWS.S}
      className="gp-p-20"
      gap={SPACING.SP_16}
    >
      <Flex
        direction="column"
        justify="space-between"
        align="start"
        gap={SPACING.SP_16}
        m={{
          direction: "row",
          align: "center",
        }}
      >
        {isFavoritePage ? (
          <Column gap={SPACING.SP_2}>
            <HeadingMedium tag="h1">Your Favourite Recipes!</HeadingMedium>
            <Body>The delicious recipes you saved</Body>
          </Column>
        ) : (
          <Column gap={SPACING.SP_2}>
            <HeadingMedium tag="h1">Recipe Finder</HeadingMedium>
            <Body tag="h2">
              Discover delicious recipes from around the world
            </Body>
          </Column>
        )}

        {isFavoritePage ? (
          <Column align="center">
            <Button
              onClick={goToHome}
              iconLeft="faArrowLeft"
              style={{ width: "180px" }}
            >
              Back home
            </Button>
          </Column>
        ) : (
          <Column align="center">
            <Button
              onClick={goToFavorite}
              iconLeft="faHeart"
              isLoading={loading}
              style={{ width: "180px" }}
            >
              My Favorites
            </Button>
          </Column>
        )}
      </Flex>
      {!isFavoritePage && (
        <>
          <Divider />
          {/* Search Bar */}
          <SearchBar />
        </>
      )}
    </Column>
  );
};

export default Header;
