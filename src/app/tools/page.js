"use client";
import { useContext, useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { Search } from "react-feather";
import VisuallyHidden from "@/components/VisuallyHidden";
import Cookie from "js-cookie";
import { motion } from "framer-motion";
import { UserSettingsContext } from "@/components/UserSettingsProvider";
import { SETTINGS, LIGHT_TOKENS, DARK_TOKENS } from "@/utils/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function ToolsPage() {
  const { userSettings, setUserSettings } = useContext(UserSettingsContext);
  const [isHydrated, setIsHydrated] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setIsHydrated(true);
    // Set theme from document after mount
    if (typeof document !== "undefined") {
      setTheme(document.documentElement.dataset.colorTheme || "light");
    }
  }, []);

  function handleUpdateSettings(setting) {
    if (setting === "darkMode") {
      const nextTheme = theme === "light" ? "dark" : "light";
      setTheme(nextTheme);

      Cookie.set("color-theme", nextTheme, { expires: 30 });

      const root = document.documentElement;
      const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
      root.setAttribute("data-color-theme", nextTheme);
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      return;
    }

    setUserSettings({
      ...userSettings,
      [setting]: !userSettings[setting],
    });
  }

  return (
    <div className={styles.page}>
      <h2 id="settings-heading">Impostazioni</h2>
      <div
        className={styles.settings}
        role="group"
        aria-labelledby="settings-heading"
      >
        {SETTINGS.map((setting, index) => (
          <motion.button
            key={setting.name}
            onClick={() => handleUpdateSettings(setting.name)}
            className={`${styles.input} ${
              isHydrated && userSettings[setting.name] ? styles.active : ""
            }`}
            role="switch"
            aria-checked={isHydrated && userSettings[setting.name]}
            aria-label={setting.title}
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              delay: shouldReduceMotion ? 0 : index * 0.1,
            }}
          >
            <span aria-hidden="true">{setting.icon}</span> {setting.title}
            <VisuallyHidden>{setting.description}</VisuallyHidden>
          </motion.button>
        ))}
      </div>
      <div
        className={styles.card}
        role="complementary"
        aria-label="Suggerimento"
      >
        <div className={styles.cardTxt}>
          <h3>Poche impostazioni?</h3>
          <p>Il tuo dispositivo può fare già tutto!</p>
          <Link href="/paths/dispositivo-accessibile?lesson=1">
            Scopri la guida completa sul tuo dispositivo
          </Link>
        </div>
        <Search aria-hidden="true" />
      </div>
    </div>
  );
}

export default ToolsPage;
