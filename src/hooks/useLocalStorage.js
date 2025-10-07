import { useEffect, useState } from "react";

/**
 *
 * @param {string} key - The name of the stored value
 * @param {*} initialValue The initial value of the stored value (if not provided will be "")
 * @returns The value and the setter function for the value
 */

function useLocalStorage(key, initialValue = "") {
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };
  const [value, setValue] = useState(readValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
