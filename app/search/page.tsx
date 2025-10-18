import { OpenLibrarySearch } from "@/features/search/OpenLibrarySearch";
import { SearchBar } from "@/features/search/SearchBar";
import { Box } from "@chakra-ui/react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({
  searchParams,
}: Readonly<SearchPageProps>) {
  const { q, page } = await searchParams;
  return (
    <Box display={"flex"} flexGrow={1} gap={8} flexDirection={"column"}>
      <SearchBar />
      <OpenLibrarySearch query={q} page={page} />
    </Box>
  );
}
