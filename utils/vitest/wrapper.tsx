import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);
