"use client";
import { useState } from "react";
import styles from "./Quiz.module.css";
import Banner from "@/components/Banner";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= questions.length * 0.6; // 60% per passare

    return (
      <div className={styles.results}>
        <h3>Risultati Quiz</h3>
        <p className={styles.score}>
          {score} su {questions.length} risposte corrette
        </p>
        {passed ? (
          <Banner type="success" title="Congratulazioni! 🎉">
            Hai superato il quiz! Ora conosci meglio l'argomento e puoi passare
            al prossimo percorso.
          </Banner>
        ) : (
          <Banner type="error" title="Non hai superato il quiz">
            Hai bisogno di almeno {Math.ceil(questions.length * 0.6)} risposte
            corrette. Riprova o rivedi le lezioni!
          </Banner>
        )}
        <button onClick={resetQuiz} className={styles.retryButton}>
          Riprova il Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.progress}>
        <p>
          Domanda {currentQuestion + 1} di {questions.length}
        </p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h3 className={styles.question}>{question.question}</h3>

      <div className={styles.answers}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`${styles.answer} ${
              selectedAnswers[currentQuestion] === index ? styles.selected : ""
            }`}
          >
            {answer}
          </button>
        ))}
      </div>

      <div className={styles.navigation}>
        {currentQuestion > 0 && (
          <button onClick={handlePrevious} className={styles.prevButton}>
            ← Precedente
          </button>
        )}
        {isAnswered && (
          <button onClick={handleNext} className={styles.nextButton}>
            {currentQuestion === questions.length - 1
              ? "Vedi Risultati"
              : "Prossima →"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
