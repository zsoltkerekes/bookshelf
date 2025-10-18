import { OpenLibraryBook } from "@/components/shared/open-library-book/OpenLibraryBook";
import { Book } from "@/interfaces/open-library/book";
import { Stack, Text } from "@chakra-ui/react";
import { olBookSearch } from "./repository/search";
import { Paginator } from "./ui/Paginator";

export const OpenLibrarySearch = async ({
  query,
  page,
}: {
  query?: string;
  page?: string;
}) => {
  if (!query) {
    return null;
  }
  const { books, error } = await olBookSearch(query, page);
  if (!books?.docs.length) {
    return (
      <Stack gap="8" direction="row" wrap="wrap" justifyContent="center">
        <Text>There are no books here...</Text>
      </Stack>
    );
  }

  return (
    <>
      {books.numFound > 100 && (
        <Stack gap="8" direction="row" wrap="wrap" justifyContent="center">
          <Paginator
            count={books.numFound}
            currentPage={Number(page) || 1}
            query={query}
          />
        </Stack>
      )}
      <Stack gap="8" direction="row" wrap="wrap" justifyContent="center">
        {books?.docs.map((book: Book) => (
          <OpenLibraryBook book={book} key={book.key} />
        ))}
      </Stack>
      {error && <Text>There was an error, try again later!</Text>}
    </>
  );
};
