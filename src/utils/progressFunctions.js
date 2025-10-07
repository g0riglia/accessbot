import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

/**
 * Get user progress for all paths
 */
export async function getUserProgress(userId) {
  if (!userId) return null;

  try {
    const docRef = doc(db, "userProgress", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Create default progress
      const defaultProgress = {
        paths: {},
        totalQuestionsAsked: 0,
        completedPaths: 0,
      };
      await setDoc(docRef, defaultProgress);
      return defaultProgress;
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    return null;
  }
}

/**
 * Mark a lesson as completed
 */
export async function markLessonComplete(userId, pathSlug, lessonNumber) {
  if (!userId) {
    console.log("No userId provided");
    return false;
  }

  try {
    console.log(`Attempting to mark lesson ${lessonNumber} for ${pathSlug}`);
    const docRef = doc(db, "userProgress", userId);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Creating new progress document");
      // Create document if it doesn't exist
      await setDoc(docRef, {
        paths: {
          [pathSlug]: {
            completedLessons: [lessonNumber],
            completed: false,
          },
        },
        totalQuestionsAsked: 0,
        completedPaths: 0,
      });
      console.log("New document created successfully");
    } else {
      const currentData = docSnap.data();
      const completedLessons =
        currentData.paths?.[pathSlug]?.completedLessons || [];

      console.log(`Current completed lessons: ${completedLessons}`);

      if (!completedLessons.includes(lessonNumber)) {
        completedLessons.push(lessonNumber);
        console.log(
          `Adding lesson ${lessonNumber}, new array: ${completedLessons}`
        );

        await setDoc(
          docRef,
          {
            ...currentData,
            paths: {
              ...currentData.paths,
              [pathSlug]: {
                ...currentData.paths?.[pathSlug],
                completedLessons,
              },
            },
          },
          { merge: true }
        );
        console.log("Document updated successfully");
      } else {
        console.log(`Lesson ${lessonNumber} already completed`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    return false;
  }
}

/**
 * Mark a path as completed
 */
export async function markPathComplete(userId, pathSlug) {
  if (!userId) return false;

  try {
    const docRef = doc(db, "userProgress", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentData = docSnap.data();

      await setDoc(
        docRef,
        {
          ...currentData,
          paths: {
            ...currentData.paths,
            [pathSlug]: {
              ...currentData.paths?.[pathSlug],
              completed: true,
            },
          },
          completedPaths: (currentData.completedPaths || 0) + 1,
        },
        { merge: true }
      );
    }

    return true;
  } catch (error) {
    console.error("Error marking path complete:", error);
    return false;
  }
}

/**
 * Increment questions asked counter
 */
export async function incrementQuestionsAsked(userId) {
  if (!userId) return false;

  try {
    const docRef = doc(db, "userProgress", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Create document if it doesn't exist
      await setDoc(docRef, {
        paths: {},
        totalQuestionsAsked: 1,
        completedPaths: 0,
      });
    } else {
      const currentData = docSnap.data();
      await setDoc(
        docRef,
        {
          ...currentData,
          totalQuestionsAsked: (currentData.totalQuestionsAsked || 0) + 1,
        },
        { merge: true }
      );
    }

    return true;
  } catch (error) {
    console.error("Error incrementing questions:", error);
    return false;
  }
}

/**
 * Calculate completion percentage for a path
 */
export function calculatePathCompletion(
  pathSlug,
  totalLessons,
  completedLessons = []
) {
  if (!completedLessons || completedLessons.length === 0) return 0;
  return Math.round((completedLessons.length / totalLessons) * 100);
}

/**
 * Get path progress
 */
export async function getPathProgress(userId, pathSlug) {
  if (!userId) return { completedLessons: [], completed: false };

  try {
    const progress = await getUserProgress(userId);
    return (
      progress?.paths?.[pathSlug] || { completedLessons: [], completed: false }
    );
  } catch (error) {
    console.error("Error getting path progress:", error);
    return { completedLessons: [], completed: false };
  }
}
