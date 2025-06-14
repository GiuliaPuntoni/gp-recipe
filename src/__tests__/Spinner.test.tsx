import { render } from "@testing-library/react";
import Spinner from "../components/Spinner/Spinner";

describe("Spinner", () => {
  test("renders spinner element", () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector(".gp-spinner");
    expect(div).not.toBeNull();
  });
});
