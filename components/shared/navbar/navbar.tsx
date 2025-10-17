import { ColorModeButton } from "@/components/ui/color-mode";
import styles from "./navbar.module.css";
import { Heading, Link } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" marginRight="auto">
        <Heading as={"h1"}>Bookshelf</Heading>
      </Link>
      <ColorModeButton />
    </nav>
  );
};
