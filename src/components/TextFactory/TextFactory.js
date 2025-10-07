"use client";
import { useId, useState } from "react";
import styles from "./TextFactory.module.css";

function TextFactory() {
  const id = useId();
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);

  return (
    <div className={styles.container}>
      <h4>Prova a modificare il testo usando gli sliders!</h4>
      <p
        className={styles.sampleText}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          letterSpacing: `${letterSpacing}px`,
          wordSpacing: `${wordSpacing}px`,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </p>
      <div className={styles.sliders}>
        <div className={styles.sliderGroup}>
          <label htmlFor={`${id}-fontSize`}>
            Dimensione testo: {fontSize}px
          </label>
          <input
            id={`${id}-fontSize`}
            type="range"
            min="12"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </div>

        <div className={styles.sliderGroup}>
          <label htmlFor={`${id}-lineHeight`}>
            Altezza linea: {lineHeight.toFixed(1)}
          </label>
          <input
            id={`${id}-lineHeight`}
            type="range"
            min="1"
            max="2.5"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
          />
        </div>

        <div className={styles.sliderGroup}>
          <label htmlFor={`${id}-letterSpacing`}>
            Spaziatura lettere: {letterSpacing}px
          </label>
          <input
            id={`${id}-letterSpacing`}
            type="range"
            min="-2"
            max="10"
            step="0.5"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
          />
        </div>

        <div className={styles.sliderGroup}>
          <label htmlFor={`${id}-wordSpacing`}>
            Spaziatura parole: {wordSpacing}px
          </label>
          <input
            id={`${id}-wordSpacing`}
            type="range"
            min="0"
            max="20"
            step="1"
            value={wordSpacing}
            onChange={(e) => setWordSpacing(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default TextFactory;
