"use client";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { NAVBAR_BUTTONS } from "@/utils/constants";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar} aria-label="Navigazione principale">
      <div className={styles.container}>
        {NAVBAR_BUTTONS.map((button) => (
          <Link
            className={`${styles.button} ${
              pathname === button.route ? styles.buttonActive : ""
            }`}
            href={button.route}
            key={button.label}
            aria-label={button.label}
            aria-current={pathname === button.route ? "page" : undefined}
          >
            <span aria-hidden="true">{button.icon}</span>
            <p>{button.label}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
