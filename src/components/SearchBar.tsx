import { fetchRecipieByName } from "@/store/recipeSlice";
import { selectRecipeLoading } from "@/store/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button, InputSearch, Row, SPACING } from "gpdesign";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState("");

  const loading = useAppSelector(selectRecipeLoading);

  const handleSubmit = () => {
    dispatch(fetchRecipieByName({ query }));
  };

  const handleReset = () => {
    setQuery("");
    dispatch(fetchRecipieByName({ query: "" }));
  };

  return (
    <Row gap={SPACING.SP_8}>
      <InputSearch
        id="search"
        placeholder={"Search for recipes by name..."}
        disabled={loading}
        value={query}
        handleChange={(val: string) => setQuery(val)}
        handleReset={handleReset}
      />

      <Button
        iconLeft="faSearch"
        type="submit"
        // disabled={!query.trim() || loading}
        onClick={handleSubmit}
      >
        {loading ? <span>Searching...</span> : <>Search</>}
      </Button>
    </Row>
  );
};

export default SearchBar;
