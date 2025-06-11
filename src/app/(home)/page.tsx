import ErrorBoundary from "@/components/utils/ErrorBoundary";
import HomePageComponent from "./HomePageComponent";

export default function HomePage() {
  return (
    <main>
      <ErrorBoundary>
        <HomePageComponent />
      </ErrorBoundary>
    </main>
  );
}
