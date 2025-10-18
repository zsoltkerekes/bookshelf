import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center minH="80vh" w="100%">
      <VStack gap="4">
        <Spinner color="teal.500" size="xl" />
        <Text color="gray.600">Dusting off your bookshelf...</Text>
        <Text color="gray.600">
          ...Please wait while the dust bunnies are settling
        </Text>
      </VStack>
    </Center>
  );
}
