import Link from "next/link";
import styles from "./LazyLink.module.css";

export const LazyLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href} prefetch={false} className={styles.lazyLink}>
      {children}
    </Link>
  );
};
