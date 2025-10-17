import { Navbar } from "./navbar";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wrapper } from "@/utils/vitest/wrapper";

describe("Navbar", () => {
  test("should render correctly", () => {
    render(<Navbar />, { wrapper: Wrapper });
    expect(screen.getByRole("navigation")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Toggle color mode" }),
    ).toBeTruthy();
    expect(screen.getAllByRole("heading")).toBeTruthy();
  });
});
