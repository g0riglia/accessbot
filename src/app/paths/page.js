"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { LEARNING_PATHS } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  getUserProgress,
  calculatePathCompletion,
} from "@/utils/progressFunctions";

function PathsPage() {
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const [pathsWithProgress, setPathsWithProgress] = useState(LEARNING_PATHS);

  useEffect(() => {
    async function loadProgress() {
      if (user) {
        const progress = await getUserProgress(user.uid);

        if (progress) {
          const updatedPaths = LEARNING_PATHS.map((path) => {
            const pathProgress = progress.paths?.[path.slug];
            const completion = calculatePathCompletion(
              path.slug,
              path.lessons,
              pathProgress?.completedLessons || []
            );

            return {
              ...path,
              completion,
              completedLessons: pathProgress?.completedLessons || [],
            };
          });

          setPathsWithProgress(updatedPaths);
        }
      } else {
        // Reset to default if no user - completion 0
        const pathsWithZero = LEARNING_PATHS.map((path) => ({
          ...path,
          completion: 0,
          completedLessons: [],
        }));
        setPathsWithProgress(pathsWithZero);
      }
    }

    loadProgress();

    // Also reload when window gets focus (user returns to page)
    const handleFocus = () => {
      loadProgress();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user]);

  return (
    <div className={styles.page}>
      <h2 id="paths-heading">Scegli il tuo percorso 🎓</h2>
      <p className={styles.subtitle}>
        Impara come rendere ogni esperienza più accessibile a tutti.
      </p>
      <div className={styles.paths} role="list" aria-labelledby="paths-heading">
        {pathsWithProgress.map(
          ({
            id,
            description,
            title,
            completion,
            tags,
            lessons,
            slug,
            image,
            imageAlt,
            completedLessons = [],
          }) => {
            const nextLesson =
              completedLessons.length > 0
                ? Math.max(...completedLessons) + 1
                : 1;
            const lessonToStart = nextLesson <= lessons ? nextLesson : 1;

            return (
              <motion.article
                className={styles.path}
                key={id}
                role="listitem"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  delay: shouldReduceMotion ? 0 : id * 0.1,
                }}
              >
                <div className={styles.top}>
                  <Image src={image} alt={imageAlt} width={100} height={100} />
                  <div className={styles.topTxt}>
                    <h3>{title}</h3>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.lessons}>Lezioni: {lessons}</p>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.bottomHeader}>
                    <div
                      className={styles.progressBar}
                      role="progressbar"
                      aria-valuenow={completion}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`Progresso: ${completion}%`}
                    >
                      <div className={styles.bar}>
                        <div
                          style={{
                            backgroundColor: "var(--color-primary)",
                            width: `${completion}%`,
                          }}
                          aria-hidden="true"
                        ></div>
                      </div>
                      <p aria-hidden="true">{completion}%</p>
                    </div>
                    <Link
                      href={`/paths/${slug}?lesson=${lessonToStart}`}
                      aria-label={`${
                        completion === 0
                          ? "Inizia"
                          : completion === 100
                          ? "Rivedi"
                          : "Continua"
                      } il percorso ${title}`}
                    >
                      {completion === 0
                        ? "Inizia"
                        : completion === 100
                        ? "Rivedi"
                        : "Continua"}
                    </Link>
                  </div>
                  <ul
                    className={styles.tags}
                    aria-label="Categorie del percorso"
                  >
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          }
        )}
      </div>
    </div>
  );
}

export default PathsPage;
