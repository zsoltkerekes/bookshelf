"use client";

import { useRouter } from "next/navigation";
import {
  ButtonGroup,
  ClientOnly,
  IconButton,
  Pagination,
  Spinner,
  VStack,
  Text,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useTransition } from "react";

interface PaginatorProps {
  count: number;
  currentPage: number;
  query: string;
}

export const Paginator = ({ count, currentPage, query }: PaginatorProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const redirect = (querySting: string, pageNumber: number) => {
    startTransition(() => {
      router.push(`/search/?q=${querySting}&page=${pageNumber}`);
    });
  };

  return (
    <ClientOnly>
      <Pagination.Root count={count} pageSize={100} defaultPage={currentPage}>
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: "outline", _selected: "solid" }}
                onClick={() => redirect(query, page.value)}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
        {isPending && (
          <VStack gap="4" marginTop={8}>
            <Spinner color="teal.500" size="xl" />
            <Text color="gray.600">Turning the page, be patient..</Text>
          </VStack>
        )}
      </Pagination.Root>
    </ClientOnly>
  );
};
