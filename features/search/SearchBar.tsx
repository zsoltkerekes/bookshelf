"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";
import {
  Field,
  Input,
  IconButton,
  ClientOnly,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { SearchBarSkeleton } from "./ui/SearchBarSkeleton";
import { useState, useTransition } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [input, setInput] = useState(query);
  const [isPending, startTransition] = useTransition();
  const redirect = () => {
    startTransition(() => {
      router.push(`/search?q=${input}`);
    });
  };
  return (
    <ClientOnly fallback={<SearchBarSkeleton />}>
      <section className={styles.container}>
        <Field.Root>
          <Field.Label>Searh by anything!</Field.Label>
          <Input
            placeholder="Book title, or author, or subject, or something else.."
            defaultValue={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyUp={(key) => {
              if (key.code === "Enter") {
                redirect();
              }
            }}
          />
        </Field.Root>
        <IconButton aria-label="Search" onClick={redirect}>
          <LuSearch />
        </IconButton>
      </section>
      {isPending && (
        <VStack gap="4">
          <Spinner color="teal.500" size="xl" />
          <Text color="gray.600">
            Please wait while we look everywhere, and find everything...
          </Text>
        </VStack>
      )}
    </ClientOnly>
  );
};
