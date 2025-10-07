import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import AccessBotLogo from "/public/images/accessbot-logo.svg";
import { SITE_TITLE } from "@/utils/constants.js";

function Header() {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        aria-label="Torna alla home di AccessBot"
      >
        <Image
          src="/images/accessbot-logo.svg"
          alt=""
          width={60}
          height={40}
          aria-hidden="true"
        />
        <p>{SITE_TITLE}</p>
      </Link>
    </header>
  );
}

export default Header;
