import { render, screen } from "@testing-library/react";
import GameCard from "./GameCard";

test("renders game title", () => {
  render(<GameCard game={{ id: 1, name: "Portal 2", rating: 4.5, released: "2011-04-18" }} />);
  expect(screen.getByText("Portal 2")).toBeInTheDocument();
});
