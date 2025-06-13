import { useIsMobile } from "@/hooks/useIsMobile";
import {
  fetchRecipeByIngredient,
  fetchRecipeByName,
} from "@/store/recipeSlice";
import { selectRecipeLoading } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Body,
  BodySmall,
  Button,
  Column,
  Flex,
  InputSearch,
  Row,
  SIZES,
  SPACING,
} from "gpdesign";
import { useState } from "react";
import BannerFixed from "./utilsComponents/BannerFixed";

const Ingredients = [
  "Chicken",
  "Beef",
  "Potatoes",
  "Salmon",
  "Mussels",
  "Eggs",
  "Avocado",
  "Garlic",
];

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const isMobile = useIsMobile();

  // States
  const [query, setQuery] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [name, setName] = useState("");

  // Selectors
  const loading = useAppSelector(selectRecipeLoading);

  // Handlers
  const handleSubmit = () => {
    setIngredient("");
    setName(query);
    dispatch(fetchRecipeByName({ query }));
  };

  const handleIngredientClick = (search: string) => {
    setQuery("");
    setName("");
    setIngredient(search);
    dispatch(fetchRecipeByIngredient({ ingredient: search }));
  };

  const handleReset = () => {
    setName("");
    setQuery("");
    setIngredient("");
    dispatch(fetchRecipeByName({ query: "" }));
  };

  // Components

  const searchBox = (
    <Flex gap={SPACING.SP_8} direction="column" m={{ direction: "row" }}>
      <InputSearch
        id="search"
        placeholder={"Search for recipes by name..."}
        disabled={loading}
        value={query}
        handleChange={(val: string) => setQuery(val)}
        handleReset={handleReset}
        onSubmit={handleSubmit}
      />
      <Row gap={SPACING.SP_8}>
        <Button
          iconLeft="faSearch"
          disabled={!query.trim() || loading}
          onClick={handleSubmit}
          style={{ width: isMobile ? "100%" : "180px" }}
        >
          {loading ? <span>Searching...</span> : <>Search</>}
        </Button>
        <Button iconLeft="faRotate" onClick={handleReset}></Button>
      </Row>
    </Flex>
  );

  const searchResultsBox = (
    <Column
      className={isMobile ? "" : "gp-pt-16"}
      style={{ minHeight: isMobile ? "auto" : "40px" }}
    >
      {name || ingredient ? (
        <Body>
          Search Results for:{" "}
          <Body tag="span" weight="600">
            {name || ingredient}
          </Body>
        </Body>
      ) : (
        <Body>Discover the recipes!</Body>
      )}
    </Column>
  );

  const searchIngredients = (
    <Row
      gap={SPACING.SP_8}
      align="center"
      wrap="wrap"
      className={isMobile ? "gp-pt-16" : ""}
    >
      <BodySmall weight="600">Search by ingredients:</BodySmall>
      {Ingredients.map((search) => (
        <Button
          theme={ingredient === search ? "primary" : "secondary"}
          size={SIZES.S}
          key={search}
          onClick={() => handleIngredientClick(search)}
          disabled={loading}
        >
          {search}
        </Button>
      ))}
    </Row>
  );

  return isMobile ? (
    <Column gap={SPACING.SP_16}>
      <BannerFixed> {searchBox}</BannerFixed>
      {searchIngredients}
      {searchResultsBox}
    </Column>
  ) : (
    <Column gap={SPACING.SP_16}>
      {searchBox}
      {searchIngredients}
      {searchResultsBox}
    </Column>
  );
};

export default SearchBar;
