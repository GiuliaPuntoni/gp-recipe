import { useIsMobile } from "@/hooks/useIsMobile";
import {
  selectSearchedIngredient,
  selectSearchedQuery,
} from "@/store/selectors";
import { useAppSelector } from "@/store/store";
import { Body, Column, HeadingMedium, SPACING } from "gpdesign";

const SearchedResultsBox = () => {
  const isMobile = useIsMobile();

  // Selector
  const ingredient = useAppSelector(selectSearchedIngredient);
  const searched = useAppSelector(selectSearchedQuery);

  return (
    <Column
      className="gp-pt-16"
      style={{ minHeight: isMobile ? "auto" : "40px" }}
    >
      {searched || ingredient ? (
        <Body>
          Search Results for:{" "}
          <Body tag="span" weight="600">
            {searched || ingredient}
          </Body>
        </Body>
      ) : (
        <Column align="center" gap={SPACING.SP_4}>
          <HeadingMedium tag="h2">
            A selection of our delicious recipes
          </HeadingMedium>
          <Body italic>Explore these recipes and get inspired!</Body>
        </Column>
      )}
    </Column>
  );
};

export default SearchedResultsBox;
