import { ColorModeButton } from "@/components/ui/color-mode";
import styles from "./navbar.module.css";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { LazyLink } from "../lazy-link/LazyLink";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <LazyLink href="/">
        <Image
          src="/bookshelf.svg"
          alt="Bookshelf logo"
          height={20}
          width={20}
        />
        <Heading as={"h1"} fontSize={"xl"}>
          Bookshelf at Home
        </Heading>
      </LazyLink>
      <LazyLink href="/search">
        <Text fontSize={"medium"}>Search</Text>
      </LazyLink>
      <Box marginLeft="auto">
        <ColorModeButton />
      </Box>
    </nav>
  );
};
