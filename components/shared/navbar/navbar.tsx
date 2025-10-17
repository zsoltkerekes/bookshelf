import { ColorModeButton } from "@/components/ui/color-mode";
import styles from "./navbar.module.css";
import { Heading, Link } from "@chakra-ui/react";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" marginRight="auto">
        <Image
          src="/bookshelf.svg"
          alt="Bookshelf logo"
          height={20}
          width={20}
        />
        <Heading as={"h1"}>Bookshelf at Home</Heading>
      </Link>
      <ColorModeButton />
    </nav>
  );
};
