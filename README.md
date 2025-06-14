# GP Recipe Finder

## Project Overview

GP Recipe Finder is a Next.js application for browsing meals from [TheMealDB](https://www.themealdb.com/). Users can search recipes by name or ingredient, view detailed instructions in a modal and save favorites for later. Favorites are stored in `localStorage` so they persist between sessions.

### Features

- Search recipes by name or ingredient
- View recipe details in a modal window
- Mark and manage favorite recipes
- Favorites persistence via `localStorage`
- Global state management with Redux Toolkit
- UI components from gpdesign with Tailwind utilities

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Run the unit tests:

```bash
npm test
```

## Key Libraries

- **Next.js** – routing and server-side rendering
- **Redux Toolkit** and **React Redux** – state management
- **gpdesign** – design system components
- **Tailwind CSS** – utility styling
- **Jest** and **React Testing Library** – testing

## gpdesign Usage

You can find **gpdesing** github project [here](https://github.com/GiuliaPuntoni/gpdesign) and the npm package info [here](https://www.npmjs.com/package/gpdesign).

Base styles are imported in `src/app/layout.tsx`:

```tsx
import "gpdesign/dist/index.css";
```

Components such as `Column`, `Row`, `Body` and `Button` are used throughout the app.

```tsx
import { Column, Body, Button } from "gpdesign";

<Column>
  <Body>Delicious recipe</Body>
  <Button onClick={addToFavorites}>Save</Button>
</Column>;
```

## Design Decisions

- Favorites are stored using `localStorage` through the `favoritesService` utility.
- Redux manages search results, the selected recipe and UI state like dialogs and toast messages.
- gpdesign provides a consistent look while Tailwind utilities handle some particular features.
