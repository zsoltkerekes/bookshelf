import { Book } from "@/interfaces/open-library/book";
import { FunctionComponent } from "react";
import { Card, Text } from "@chakra-ui/react";
import Image from "next/image";
import styles from "./OpenLibraryBook.module.css";

export const OpenLibraryBook: FunctionComponent<{ book: Book }> = ({
  book,
}) => {
  const bookCoverImageSrc = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`
    : null;
  const scanImageScr =
    book.ia && book.ia[0]
      ? `https://archive.org/services/img/${book.ia[0]}`
      : null;
  const fallbackSrc = "https://archive.org/images/notfound.png";
  const src = bookCoverImageSrc
    ? bookCoverImageSrc
    : scanImageScr
      ? scanImageScr
      : fallbackSrc;

  return (
    <Card.Root width="260px">
      <Card.Header textAlign="center">
        <span
          className={styles.textEllipsis + " " + styles.block}
          title={book.author_name?.join(", ")}
        >
          {book.author_name?.join(", ")}
        </span>
      </Card.Header>
      <Card.Body gap="2">
        <Card.Title mt="2" textAlign="center">
          <span
            className={styles.textEllipsis + " " + styles.block}
            title={book.title}
          >
            {book.title}
          </span>
        </Card.Title>
        <Card.Description margin="auto">
          <Image
            src={src}
            alt={book.title}
            width={200}
            height={300}
            loading="lazy"
          />
        </Card.Description>
      </Card.Body>
      <Card.Footer textAlign="center" display="block">
        <Text>
          Published: <strong>{book.first_publish_year}</strong>
        </Text>
        <Text className={styles.textEllipsis} title={book.language?.join(", ")}>
          Languages: {book.language?.join(", ")}
        </Text>
      </Card.Footer>
    </Card.Root>
  );
};
