"use client";

import {
  Body,
  Button,
  COLORS,
  Column,
  HeadingMedium,
  RADIUS,
  Row,
  SPACING,
} from "gpdesign";
import { useRouter } from "next/navigation";

const Header = ({ isFavoritePage }: { isFavoritePage?: boolean }) => {
  const router = useRouter();

  const goToFavorite = () => {
    router.push("/my-favorite");
  };

  const goToHome = () => {
    router.push("/");
  };
  return (
    <Row
      tag="header"
      justify="space-between"
      align="center"
      className="gp-p-16"
      bg={COLORS.bgWhite}
      radius={RADIUS.M}
    >
      {isFavoritePage ? (
        <Column gap={SPACING.SP_2}>
          <HeadingMedium tag="h1">Your Favourite Recipes!</HeadingMedium>
        </Column>
      ) : (
        <Column gap={SPACING.SP_2}>
          <HeadingMedium tag="h1">GP Recipe Finder</HeadingMedium>
          <Body>Discover delicious recipes from around the world</Body>
        </Column>
      )}

      {isFavoritePage ? (
        <Column align="center">
          <Button onClick={goToHome} iconLeft="faArrowLeft">
            Back home
          </Button>
        </Column>
      ) : (
        <Column align="center">
          <Button onClick={goToFavorite} iconLeft="faHeart">
            My Favorites
          </Button>
        </Column>
      )}
    </Row>
  );
};

export default Header;
