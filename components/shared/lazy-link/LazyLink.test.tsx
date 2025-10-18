import { LazyLink } from "./LazyLink";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wrapper } from "@/utils/vitest/wrapper";

describe("LazyLink", () => {
  test("should render correctly with href and children", () => {
    render(
      <LazyLink href="/test-path">
        <span>Test Link</span>
      </LazyLink>,
      { wrapper: Wrapper },
    );

    const link = screen.getByRole("link");
    expect(link).toBeTruthy();
    expect((link as HTMLAnchorElement).href).toBe(
      "http://localhost:3000/test-path",
    );
    expect(screen.getByText("Test Link")).toBeTruthy();
  });
});
