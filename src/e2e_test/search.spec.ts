import { expect, test } from "@playwright/test";

test("searches recipes by name", async ({ page }) => {
  await page.route("**/search.php**", async (route) => {
    const url = new URL(route.request().url());
    const query = url.searchParams.get("s");

    console.log("Playwright intercepted fetch with query:", query);

    const data = query
      ? {
          meals: [
            {
              idMeal: "1",
              strMeal: "Test Chicken",
              strMealThumb:
                "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
              strCategory: "TestCat",
              strArea: "TestArea",
              strInstructions: "Test instructions",
            },
          ],
        }
      : { meals: [] };

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  });

  await page.goto("/");

  const input = page.getByPlaceholder("Search for recipes by name...");
  await input.fill("chicken");
  await page.getByRole("button", { name: /search/i }).click();

  await page.waitForSelector("text=Test Chicken");
  await expect(page.getByText("Test Chicken")).toBeVisible();
});
