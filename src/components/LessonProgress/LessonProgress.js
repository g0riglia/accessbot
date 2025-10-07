"use client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  markLessonComplete,
  markPathComplete,
  getPathProgress,
} from "@/utils/progressFunctions";

function LessonProgress({ pathSlug, lessonNumber, totalLessons }) {
  const { user } = useAuth();

  useEffect(() => {
    async function trackProgress() {
      if (user && lessonNumber) {
        console.log(
          `Marking lesson ${lessonNumber} as complete for ${pathSlug}`
        );

        // Mark current lesson as viewed/completed
        const marked = await markLessonComplete(
          user.uid,
          pathSlug,
          lessonNumber
        );
        console.log(`Lesson marked: ${marked}`);

        // Check if all lessons are completed
        const pathProgress = await getPathProgress(user.uid, pathSlug);
        const completedLessons = pathProgress.completedLessons || [];
        console.log(
          `Completed lessons: ${completedLessons}, Total: ${totalLessons}`
        );

        // If all lessons are completed, mark path as complete
        if (
          completedLessons.length === totalLessons &&
          !pathProgress.completed
        ) {
          console.log(`Marking path ${pathSlug} as complete!`);
          await markPathComplete(user.uid, pathSlug);
        }
      } else {
        console.log("No user or lesson number:", {
          user: !!user,
          lessonNumber,
        });
      }
    }

    // Track after a delay to ensure user is actually reading
    const timer = setTimeout(() => {
      trackProgress();
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [user, pathSlug, lessonNumber, totalLessons]);

  return null; // This component doesn't render anything
}

export default LessonProgress;
