import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("./repository/search-for-popular-books", () => ({
  searchForPopularBooks: vi.fn(),
}));

import { searchForPopularBooks } from "./repository/search-for-popular-books";
import { BookTeaser } from "./BookTeaser";
import { makeBook } from "@/utils/vitest/make-book";
import { Wrapper } from "@/utils/vitest/wrapper";

describe("BookTeaser", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders list of books when repository returns data", async () => {
    (
      searchForPopularBooks as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      popularBooks: {
        docs: [
          { ...makeBook(), title: "Title 1" },
          { ...makeBook(), title: "Title 2" },
        ],
      },
      error: null,
    });

    const ui = await BookTeaser();
    render(ui, { wrapper: Wrapper });

    expect(screen.getByText("Title 1")).toBeTruthy();
    expect(screen.getByText("Title 2")).toBeTruthy();
    // two cards with images
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(2);
  });

  test("shows error message when repository returns error", async () => {
    (
      searchForPopularBooks as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      popularBooks: null,
      error: new Error("some error"),
    });

    const ui = await BookTeaser();
    render(ui, { wrapper: Wrapper });
    expect(screen.getByText(/There was an error, try again!/)).toBeTruthy();
  });
});
