import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const searchButton = screen.getByText(/Search Facilities/i);
  const streetInput = screen.getByText(/Street/i);
  expect(searchButton).toBeInTheDocument();
  expect(streetInput).toBeInTheDocument();
});
