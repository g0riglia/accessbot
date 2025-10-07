"use client";
import { useState } from "react";
import styles from "./ThemesTester.module.css";
import { Sun, Moon } from "react-feather";

function ThemesTester() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={styles.container}>
      <p>
        Tema attuale:{" "}
        {theme === "light"
          ? "Chiaro"
          : theme === "dark"
          ? "Scuro"
          : "Alto Contrasto"}
      </p>
      <div className={`${styles.canvas} ${styles[theme]}`}>
        <p className={styles.bigText}> Prova a cambiare il tema</p>
        <p>
          Questo testo mostra come cambia leggibilità e contrasto. Prova i vari
          temi e scegli il tuo preferito!
        </p>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => setTheme("light")}>
          <Sun />
        </button>
        <button onClick={() => setTheme("dark")}>
          <Moon />
        </button>
        <button onClick={() => setTheme("highContrast")}>
          <span className={styles.contrastIcon}></span>
        </button>
      </div>
    </div>
  );
}

export default ThemesTester;
