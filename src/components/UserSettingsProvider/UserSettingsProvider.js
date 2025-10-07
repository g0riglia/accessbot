"use client";
import { createContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export const UserSettingsContext = createContext();

function UserSettingsProvider({ children }) {
  const [userSettings, setUserSettings] = useLocalStorage("userSettings", {
    vocalFeedback: false,
    simplifyAnswers: false,
    explainBetterMode: false,
  });
  return (
    <UserSettingsContext value={{ userSettings, setUserSettings }}>
      {children}
    </UserSettingsContext>
  );
}

export default UserSettingsProvider;
