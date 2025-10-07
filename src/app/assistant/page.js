"use client";
import { useState, useRef, useEffect, useMemo, useContext } from "react";
import { Send, Mic, X } from "react-feather";
import styles from "./page.module.css";
import { askGemini } from "@/utils/utils";
import { FAQ } from "@/utils/constants";
import Markdown from "react-markdown";
import VisuallyHidden from "@/components/VisuallyHidden";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { incrementQuestionsAsked } from "@/utils/progressFunctions";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { UserSettingsContext } from "@/components/UserSettingsProvider";

function AssistantPage() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      content: "Ciao, come posso aiutarti? 😊",
      id: crypto.randomUUID(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const { userSettings } = useContext(UserSettingsContext);
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const messagesEndRef = useRef();

  const answerMethod = `
    ${
      userSettings.vocalFeedback
        ? "Rispondi alle domande in modo conciso e chiaro, usando frasi brevi e parole semplici. Evita dettagli complessi o esempi lunghi."
        : ""
    }
    ${
      userSettings.explainBetterMode
        ? "Rispondi alle domande con dettagli aggiuntivi, esempi, paragoni e spiegazioni più articolate. Non limitarti a frasi brevi, rendi la risposta educativa e completa."
        : ""
    }
  `;

  const recognition = useMemo(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "it-IT";
        return rec;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (userSettings.vocalFeedback && chatMessages.length > 1) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.sender === "bot") {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(lastMessage.content);
        utterance.lang = "it-IT";
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);
      }
    }
  }, [chatMessages, userSettings.vocalFeedback]);

  function handleSubmit(event) {
    event.preventDefault();
    const nextChatMessages = [...chatMessages];
    nextChatMessages.push({
      sender: "user",
      content: message,
      id: crypto.randomUUID(),
    });
    generateResponse(message, nextChatMessages);
    setChatMessages(nextChatMessages);
    setMessage("");
  }

  async function generateResponse(userMessage, prevChatMessages) {
    // Increment questions counter in Firebase
    if (user) {
      await incrementQuestionsAsked(user.uid);
    }

    const response = await askGemini(
      userMessage,
      chatMessages[chatMessages.length - 1], //the last message will be the bots
      answerMethod
    );
    const nextChatMessages = [...prevChatMessages];
    nextChatMessages.push({
      sender: "bot",
      content: response,
      id: crypto.randomUUID(),
    });
    setChatMessages(nextChatMessages);
  }

  function handleClickFAQ(faq) {
    const nextChatMessages = [...chatMessages];
    nextChatMessages.push({
      sender: "user",
      content: faq,
      id: crypto.randomUUID(),
    });
    generateResponse(faq, nextChatMessages);
    setChatMessages(nextChatMessages);
  }

  function handleOnRecord() {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    setIsRecording(true);

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsRecording(false);
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      if (event.error === "not-allowed") {
        alert(
          "Microphone access denied. Please allow microphone access and try again."
        );
      } else {
        alert("Speech recognition error. Please try again.");
      }
    };

    recognition.onend = function () {
      setIsRecording(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsRecording(false);
      alert("Error starting speech recognition. Please try again.");
    }
  }

  function handleStopRecording() {
    if (isRecording && recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }

  return (
    <div className={styles.page}>
      <h2 id="assistant-heading">Assistente</h2>
      <div
        className={styles.chat}
        role="region"
        aria-labelledby="assistant-heading"
      >
        <ul
          className={styles.messages}
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          <AnimatePresence>
            {chatMessages.map((message) => (
              <motion.li
                className={
                  message.sender === "bot"
                    ? styles.messageBot
                    : styles.messageUser
                }
                key={message.id}
                role={message.sender === "bot" ? "status" : undefined}
                initial={
                  shouldReduceMotion
                    ? {}
                    : { opacity: 0, x: message.sender === "bot" ? -20 : 20 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              >
                <Markdown>{message.content}</Markdown>
              </motion.li>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </ul>
        <div className={styles.inputArea}>
          <div
            className={styles.faq}
            role="group"
            aria-label="Domande frequenti"
          >
            {FAQ.map((faq, index) => (
              <button
                onClick={() => handleClickFAQ(faq.content)}
                key={index}
                aria-label={`Domanda: ${faq.title}`}
              >
                {faq.title}
              </button>
            ))}
          </div>
          <form className={styles.input} onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required={true}
              placeholder="Fai una domanda."
              aria-label="Fai una domanda all'assistente."
            />
            <div className={styles.buttons}>
              <button
                onClick={isRecording ? handleStopRecording : handleOnRecord}
                className={styles.micBtn}
                type="button"
              >
                {isRecording ? <X /> : <Mic />}
                <VisuallyHidden>
                  {isRecording
                    ? "Cancel recording"
                    : "Record the message with your microphone."}
                </VisuallyHidden>
              </button>
              <button className={styles.sendBtn}>
                <Send />
                <VisuallyHidden>Send the message</VisuallyHidden>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssistantPage;
