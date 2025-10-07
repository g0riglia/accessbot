"use client";
import styles from "./page.module.css";
import Slides from "@/components/Slides";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.page}>
      <motion.section
        className={styles.onboarding}
        aria-label="Introduzione ad AccessBot"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      >
        <Slides />
        <Link href="/assistant" className={styles.startBtn}>
          Comincia il tuo percorso
        </Link>
      </motion.section>
      <motion.section
        className={styles.aboutUs}
        aria-labelledby="about-heading"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          delay: shouldReduceMotion ? 0 : 0.2,
        }}
      >
        <h2 id="about-heading">Chi siamo</h2>
        <p>
          AccessBot nasce all'interno del PCTO <strong>"Include To Win"</strong>
          , realizzato dall'<strong>I.T.I. Augusto Righi di Napoli</strong> in
          collaborazione con il centro <strong>Sinapsi</strong> dell'Università
          Federico II e l'azienda americana <strong>Micron</strong>. La nostra
          missione non è solo creare un web accessibile, ma costruire un mondo
          più inclusivo per tutti.
        </p>
      </motion.section>

      <motion.footer
        className={styles.footer}
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          delay: shouldReduceMotion ? 0 : 0.4,
        }}
      >
        <p>
          Sviluppato da{" "}
          <a
            href="https://www.linkedin.com/in/raffaele-nini-b21703373/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Raffaele Nini
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
