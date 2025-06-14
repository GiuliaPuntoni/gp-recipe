# 🍽️ GP Recipe Finder

GP Recipe Finder is a responsive web application built with **Next.js** that allows users to search, explore, and save favorite recipes using the public [TheMealDB](https://www.themealdb.com/api.php) API.

The interface is styled using **gpdesign** (a custom design system you can find [here](https://github.com/GiuliaPuntoni/gpdesign)) and **Tailwind CSS**. Global state is managed with **Redux Toolkit**, while favorites are stored locally via `localStorage`.

---

## ✨ Features

- 🔍 Search recipes by name or ingredient
- 📄 View detailed recipe information (ingredients, instructions)
- ❤️ Save and manage favorite recipes (persisted via `localStorage`)
- 📦 Global state management using Redux Toolkit
- 💅 Consistent interface with **gpdesign** and **Tailwind**
- 🧪 Unit tested with Jest and React Testing Library
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

---

## 🧠 Design Decisions

- 🔄 **Local persistence**: favorites are stored in `localStorage` using `favoritesService`, no backend required.
- 🧭 **Redux Toolkit**: handles global state for search, recipe selection, and UI modals.
- 🎨 **gpdesign**: provides consistent styling and accessible UI components.
- ⚠️ **Error handling**: user-friendly messages for failed or empty searches.

---

## 🤔 Assumptions

- App content is in English (API only supports English).
- No authentication is required.
- API may return incomplete or null results for some queries.

---

## 🐛 Known Issues

- API responses may contain incomplete data for some search terms.
- Modal accessibility via keyboard navigation is currently limited (e.g., no focus trap or escape key handling).

---

## 🧾 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Author

**Giulia Puntoni** – [GitHub](https://github.com/GiuliaPuntoni)
