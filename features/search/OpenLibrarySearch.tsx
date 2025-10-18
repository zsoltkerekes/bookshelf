import { OpenLibraryBook } from "@/components/shared/open-library-book/OpenLibraryBook";
import { Book } from "@/interfaces/open-library/book";
import { Stack, Text } from "@chakra-ui/react";
import { olBookSearch } from "./repository/search";

export const OpenLibrarySearch = async ({ query }: { query?: string }) => {
  if (!query) {
    return null;
  }

  const { books, error } = await olBookSearch(query);

  return (
    <>
      <Stack gap="8" direction="row" wrap="wrap" justifyContent="center">
        {books?.docs.map((book: Book) => (
          <OpenLibraryBook book={book} key={book.key} />
        ))}
      </Stack>
      {error && <Text>There was an error, try again later!</Text>}
    </>
  );
};
