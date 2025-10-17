import { OpenLibraryBook } from "@/components/shared/open-library-book/OpenLibraryBook";
import { searchForPopularBooks } from "./repository/search-for-popular-books";
import { Book } from "@/interfaces/open-library/book";
import { Stack, Text } from "@chakra-ui/react";

export const BookTeaser = async () => {
  const { popularBooks, error } = await searchForPopularBooks();
  return (
    <>
      <Stack gap="8" direction="row" wrap="wrap" justifyContent="center">
        {popularBooks?.docs.map((book: Book) => (
          <OpenLibraryBook book={book} key={book.key} />
        ))}
      </Stack>
      {error && <Text>There was an error, try again!</Text>}
    </>
  );
};
