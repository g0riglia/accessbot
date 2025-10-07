"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Circle } from "react-feather";
import { range } from "@/utils/utils";
import styles from "./Slides.module.css";
import Image from "next/image";

function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  const totalSlides = SLIDES_CONTENT.length;

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Touch gesture handling
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextSlide();
    } else if (isRightSwipe) {
      goToPreviousSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPreviousSlide();
      } else if (e.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carousel di introduzione"
      aria-roledescription="carousel"
    >
      <div
        className={styles.slidesWrapper}
        style={{
          transform: `translateX(-${currentSlide * 33.333}%)`,
        }}
        aria-live="polite"
      >
        {SLIDES_CONTENT.map((slide, index) => (
          <div
            key={index}
            className={styles.slide}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} di ${totalSlides}: ${slide.title}`}
            aria-hidden={currentSlide !== index}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
            />
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
          </div>
        ))}
      </div>
      <div
        className={styles.slidesButtons}
        role="group"
        aria-label="Controlli carousel"
      >
        <button
          onClick={goToPreviousSlide}
          disabled={currentSlide === 0}
          aria-label="Vai alla slide precedente"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <button
          onClick={goToNextSlide}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Vai alla slide successiva"
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <div
        className={styles.slidesState}
        role="tablist"
        aria-label="Indicatori slide"
      >
        {range(totalSlides).map((item) => (
          <button
            key={item}
            onClick={() => setCurrentSlide(item)}
            role="tab"
            aria-label={`Vai alla slide ${item + 1}`}
            aria-selected={currentSlide === item}
            aria-controls={`slide-${item}`}
          >
            <Circle
              fill={currentSlide === item ? "currentColor" : ""}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const SLIDES_CONTENT = [
  {
    image: "/images/robot-draw.png",
    alt: "Un robot stilizzato che guarda l'utente.",
    width: 100,
    height: 125,
    title: "Benvenuto su AccessBot",
    subtitle:
      "Il tuo assistente digitale per rendere l’accessibilità semplice, chiara e a portata di tutti.",
  },
  {
    image: "/images/chat-draw.png",
    alt: "Un telefono con una chat dentro e vari simboli fluttuanti di accessibilità.",
    width: 100,
    height: 170,
    title: "Un aiuto quando serve",
    subtitle:
      "Fai domande al chatbot, ricevi consigli e scopri risorse utili per ogni esigenza.",
  },
  {
    image: "/images/paths-draw.png",
    alt: "Un libro aperto con un percorso e una meta finale e simboli di accessibilità fluttuanti.",
    width: 100,
    height: 150,
    title: "Impara passo dopo passo",
    subtitle:
      "Segui percorsi guidati e corsi interattivi per capire meglio diritti, leggi e strumenti sull’accessibilità.",
  },
];

export default Slides;
