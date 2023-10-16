/**
 * @jest-environment jsdom
 */
import Home from "@/pages/index";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    const { getByRole } = render(<Home />);

    const heading = getByRole("heading", {
      name: /testKey/i,
    });

    expect(heading).toBeDefined();
  });
});
