import styles from "./page.module.css";
import { fetchLesson, getAllLessons } from "@/utils/fetchLesson";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "react-feather";
import LessonProgress from "@/components/LessonProgress";

async function LessonPage({ params, searchParams }) {
  const { pathSlug } = await params;
  const { lesson } = await searchParams;

  const lessonNumber = lesson ? parseInt(lesson, 10) : 1;
  const lessonData = await fetchLesson(pathSlug, lessonNumber);
  const allLessons = await getAllLessons(pathSlug);

  if (!lessonData) {
    return (
      <div className={styles.page}>
        <h2>Lezione non trovata</h2>
        <p>La lezione richiesta non esiste.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <LessonProgress
        pathSlug={pathSlug}
        lessonNumber={lessonNumber}
        totalLessons={allLessons.length}
      />
      <header className={styles.lessonHeader}>
        <Link href="/paths" className={styles.backToPaths}>
          <ArrowLeft aria-hidden="true" /> Torna ai percorsi
        </Link>
        <h1>{lessonData.title}</h1>
        <p className={styles.lessonCount}>
          Lezione {lessonNumber} di {allLessons.length}
        </p>
      </header>
      <article className={styles.lessonContent}>{lessonData.content}</article>
      <nav className={styles.navigation} aria-label="Navigazione tra lezioni">
        {lessonNumber > 1 && (
          <Link
            href={`/paths/${pathSlug}?lesson=${lessonNumber - 1}`}
            className={styles.prevLesson}
            aria-label="Vai alla lezione precedente"
          >
            <ArrowLeft aria-hidden="true" /> Indietro
          </Link>
        )}
        {lessonNumber < allLessons.length && (
          <Link
            href={`/paths/${pathSlug}?lesson=${lessonNumber + 1}`}
            className={styles.nextLesson}
            aria-label="Vai alla lezione successiva"
          >
            Avanti <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  );
}

export default LessonPage;
