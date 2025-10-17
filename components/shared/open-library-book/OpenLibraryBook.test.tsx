import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OpenLibraryBook } from "./OpenLibraryBook";
import { makeBook } from "@/utils/vitest/make-book";
import { Wrapper } from "@/utils/vitest/wrapper";

describe("OpenLibraryBook", () => {
  test("renders author, title, cover image, publish year and languages", () => {
    const book = makeBook();
    render(<OpenLibraryBook book={book} />, { wrapper: Wrapper });

    // Author and title
    expect(screen.getByText("J. K. Rowling, Nemesis")).toBeTruthy();
    expect(
      screen.getByText("Harry Potter and the Order of the Phoenix"),
    ).toBeTruthy();

    // Image from cover_edition_key has priority
    const img: HTMLImageElement = screen.getByRole("img", {
      name: "Harry Potter and the Order of the Phoenix",
    });
    expect(img.src).toContain(
      "https://covers.openlibrary.org/b/olid/OL25662116M.jpg",
    );

    // Published year
    expect(screen.getByText(/Published:/)).toBeTruthy();
    expect(screen.getByText("2003")).toBeTruthy();

    // Languages
    expect(screen.getByText(/Languages:/)).toBeTruthy();
    expect(screen.getByText(/hun, eng, kor/)).toBeTruthy();
  });

  test("falls back to IA scan and then to notfound image if needed", () => {
    const bookNoCover = {
      ...makeBook(),
      cover_edition_key: "",
    };
    render(<OpenLibraryBook book={bookNoCover} />, { wrapper: Wrapper });
    const imgScan = screen.getAllByRole("img", {
      name: "Harry Potter and the Order of the Phoenix",
    })[0];
    expect((imgScan as HTMLImageElement).src).toContain(
      "https://covers.openlibrary.org/b/olid/OL25662116M.jpg",
    );

    const bookNoImages = {
      ...bookNoCover,
      ia: [],
    };
    render(<OpenLibraryBook book={bookNoImages} />, { wrapper: Wrapper });
    const imgFallback = screen
      .getAllByRole("img", {
        name: "Harry Potter and the Order of the Phoenix",
      })
      .at(-1)!;
    expect((imgFallback as HTMLImageElement).src).toContain(
      "https://archive.org/images/notfound.png",
    );
  });
});
