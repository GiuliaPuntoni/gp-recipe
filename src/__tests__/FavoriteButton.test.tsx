import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("FavoriteButton", () => {
  test("renders correctly when inactive", () => {
    render(<FavoriteButton active={false} />);
    const button = screen.getByRole("button", { name: /favorite-button/i });

    expect(button).toBeInTheDocument();
    expect(button.className).not.toContain("active");
  });

  test("renders correctly when active", () => {
    render(<FavoriteButton active={true} />);
    const button = screen.getByRole("button", { name: /favorite-button/i });

    expect(button).toBeInTheDocument();
    expect(button.className).toContain("active");
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<FavoriteButton onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button", { name: /favorite-button/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
