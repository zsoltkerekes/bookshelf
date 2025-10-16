import { Navbar } from "./navbar";
import { describe, test, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/ui/color-mode", () => ({
  ColorModeButton: () => <p>ColorModeButton</p>,
}));

describe("Navbar", () => {
  test("should render correctly", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toBeTruthy();
    expect(screen.getByText("ColorModeButton")).toBeTruthy();
  });
});
