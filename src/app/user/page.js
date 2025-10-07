"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import {
  CheckCircle,
  MessageCircle,
  LogIn,
  LogOut,
  Settings,
  Star,
} from "react-feather";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { getUserProgress } from "@/utils/progressFunctions";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function UserPage() {
  const { user, loading } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const [userStats, setUserStats] = useState({
    completedPaths: 0,
    totalQuestionsAsked: 0,
  });

  useEffect(() => {
    async function loadUserStats() {
      if (user) {
        const progress = await getUserProgress(user.uid);
        if (progress) {
          setUserStats({
            completedPaths: progress.completedPaths || 0,
            totalQuestionsAsked: progress.totalQuestionsAsked || 0,
          });
        }
      } else {
        // Reset stats if no user
        setUserStats({
          completedPaths: 0,
          totalQuestionsAsked: 0,
        });
      }
    }

    loadUserStats();

    // Also reload when window gets focus
    const handleFocus = () => {
      loadUserStats();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user]);

  async function logoutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Errore durante il logout", error);
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/images/pfp-male-01.jpeg"
          alt={
            user ? `Foto profilo di ${user.displayName}` : "Foto profilo ospite"
          }
          width={100}
          height={100}
        />
        <div className={styles.headerTxt}>
          <h2>{user ? user.displayName : "Ospite"}</h2>
          <p>Benvenuto su AccessBot</p>
        </div>
      </header>
      <section className={styles.stats} aria-label="Statistiche utente">
        <motion.div
          className={`${styles.card} ${styles.stat}`}
          role="article"
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        >
          <CheckCircle aria-hidden="true" />
          <p>Percorsi Completati</p>
          <p
            className={styles.number}
            aria-label={`${userStats.completedPaths} percorsi completati`}
          >
            {userStats.completedPaths}
          </p>
        </motion.div>
        <motion.div
          className={`${styles.card} ${styles.stat}`}
          role="article"
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
        >
          <MessageCircle aria-hidden="true" />
          <p>Domande Fatte</p>
          <p
            className={styles.number}
            aria-label={`${userStats.totalQuestionsAsked} domande fatte`}
          >
            {userStats.totalQuestionsAsked}
          </p>
        </motion.div>
      </section>
      <nav aria-label="Azioni utente" className={styles.userActions}>
        {!user ? (
          <div className={styles.card}>
            <Link href="/login" className={styles.horizontal}>
              <LogIn className={styles.login} aria-hidden="true" /> Accedi
            </Link>
          </div>
        ) : (
          <div className={styles.card}>
            <button onClick={logoutUser} className={styles.horizontalBtn}>
              <LogOut className={styles.logout} aria-hidden="true" /> Esci
            </button>
          </div>
        )}
        <div className={styles.card}>
          <Link href="/tools" className={styles.horizontal}>
            <Settings className={styles.settings} aria-hidden="true" />{" "}
            Impostazioni
          </Link>
        </div>
      </nav>
      <aside className={`${styles.card} ${styles.horizontal}`} role="note">
        <Star className={styles.star} aria-hidden="true" /> AccessBot è qui per
        rendere il mondo più accessibile!
      </aside>
    </div>
  );
}

export default UserPage;
