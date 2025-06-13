import ErrorBoundary from "@/components/utilsComponents/ErrorBoundary";
import FavoriteComponent from "./FavoriteComponent";

export default function FavoritePage() {
  return (
    <main>
      <ErrorBoundary>
        <FavoriteComponent />
      </ErrorBoundary>
    </main>
  );
}
