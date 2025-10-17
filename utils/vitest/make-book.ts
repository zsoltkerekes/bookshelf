import { Book } from "@/interfaces/open-library/book";

export const makeBook = (): Book => ({
  author_key: ["OL23919A"],
  author_name: ["J. K. Rowling", "Nemesis"],
  cover_edition_key: "OL25662116M",
  cover_i: 10523466,
  ebook_access: "borrowable",
  edition_count: 226,
  first_publish_year: 2003,
  has_fulltext: true,
  ia: ["harypotterizakon0000rowl"],
  ia_collection_s: "California-State-Suggested-Reading;additional_collections;",
  key: "/works/OL82548W",
  language: ["hun", "eng", "kor"],
  lending_edition_s: "OL26486989M",
  lending_identifier_s: "harypotterizakon0000rowl",
  public_scan_b: false,
  title: "Harry Potter and the Order of the Phoenix",
});
