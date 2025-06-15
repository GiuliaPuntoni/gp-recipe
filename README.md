# 🍽️ GP Recipe Finder

GP Recipe Finder is a responsive web application built with **Next.js** that allows users to search, explore, and save favorite recipes using the public [TheMealDB](https://www.themealdb.com/api.php) API.

The interface is styled using **gpdesign** (a custom design system you can find [here](https://github.com/GiuliaPuntoni/gpdesign)) and **Tailwind CSS**. Global state is managed with **Redux Toolkit**, while favorites are stored locally via `localStorage`.

---

## 🔗 Demo

🌍 [Live Demo on Vercel](https://gp-recipe.vercel.app)

---

## ✨ Features

- 🔍 Search recipes by name or ingredient
- 📄 View detailed recipe information (ingredients, instructions)
- ❤️ Save and manage favorite recipes (persisted via `localStorage`)
- 📦 Global state management using Redux Toolkit
- 💅 Consistent interface with **gpdesign** and **Tailwind**
- 🧪 Unit tested with Jest and React Testing Library
- 🐛 E2E test with Playwright
- 📱 Responsive and mobile-friendly UI
- ❌ Error handling for empty or failed searches

---

## 🛠️ Tech Stack

| Technology                | Purpose                           |
| ------------------------- | --------------------------------- |
| **Next.js**               | Framework for rendering & routing |
| **Redux Toolkit**         | Global state management           |
| **Tailwind CSS**          | Utility-first CSS styling         |
| **gpdesign**              | Prebuilt UI components            |
| **Jest**                  | Unit testing                      |
| **React Testing Library** | UI component testing              |
| **Playwright**            | E2E testing                       |
| **TheMealDB API**         | Recipe data source                |

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/GiuliaPuntoni/gp-recipe.git
cd gp-recipe
```

2. Install dependencies:

```bash
npm install
```

---

## 🚀 Development

Start the development server:

```bash
npm run dev
```

---

## 🧪 Testing

Run unit tests:

```bash
npm test
```

Run e2e test:

```bash
npm run test:e2e          # run E2E tests in headless mode
npm run test:e2e:headed   # run with visible browser
npm run test:e2e:debug    # run in debug mode
```

---

## 🧠 Design Decisions

This project was developed with a focus on simplicity, scalability, and maintainability. Key architectural and tooling choices are explained below.

### 🔄 Redux Toolkit

Redux Toolkit was chosen as the global state management solution because it provides a **modern and streamlined way to manage complex state**. This allows the app to scale cleanly as new features (e.g., filters, user sessions) are added in the future.

### 💾 localStorage

`localStorage` is used to persist the user’s list of favorite recipes across sessions. This approach was selected because:

- It enables **client-side persistence without requiring a backend or user authentication**
- It's quick to implement and lightweight for this type of app
- A dedicated `favoritesService` utility wraps all interactions with `localStorage`, keeping the logic centralized and testable, and making future migration to a remote backend easier

### 🎨 gpdesign UI Library

The application uses `gpdesign`, a design system and component library developed separately (and also authored by me). This choice was made to:

- Ensure a **consistent and accessible UI** using well-defined components like `Column`, `Body`, and `Button`
- **Integrate code I’ve personally written**, demonstrating how I structure and reuse frontend libraries across multiple projects
- Showcase a **component-based design approach**, where visual and functional elements are modular, predictable, and easy to test or replace

By using `gpdesign`, I also aimed to highlight my ability to **architect reusable UI systems**, integrate them into real-world projects, and maintain a clean developer experience through well-scoped abstractions.

---

## 🤔 Assumptions

- App content is in English (API only supports English).
- No authentication is required.
- API may return incomplete or null results for some queries.

---

## 🐛 Known Issues

- API responses may contain incomplete data for some search terms.
- Modal accessibility via keyboard navigation is currently limited (e.g., no focus trap or escape key handling).
- Error handling in `recipeApi.ts` is basic — all fetch errors are thrown as generic strings.
- No autocomplete in the search bar — enhancing the `SearchBar.tsx` with dynamic suggestions would improve UX.
- The favorites feature could be made more visible — e.g., showing the count of saved recipes and providing a “Clear All” button.

---

## 🧾 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Author

**Giulia Puntoni** – [GitHub](https://github.com/GiuliaPuntoni)
