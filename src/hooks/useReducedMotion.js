import { useContext } from "react";
import { UserSettingsContext } from "@/components/UserSettingsProvider";

export function useReducedMotion() {
  const { userSettings } = useContext(UserSettingsContext);

  // Check user preference first, then system preference
  if (userSettings.reduceAnimations) {
    return true;
  }

  // Check system preference
  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    return mediaQuery.matches;
  }

  return false;
}

export function getAnimationProps(shouldReduce) {
  if (shouldReduce) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      transition: { duration: 0 },
    };
  }

  return {};
}
