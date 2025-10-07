import { GoogleGenerativeAI } from "@google/generative-ai";
import { DOCUMENT_CONTEXT } from "./constants";

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function askGemini(
  userQuery,
  previousAnswer = "None",
  answerMethod = ""
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  });

  const prompt = `${DOCUMENT_CONTEXT}
 Questa è la risposta precedente che hai dato, se alla fine c'è una domanda e l'utente risponde solo con frasi tipo "Si" riferisciti a questa: ${previousAnswer}
 Rispondi secondo queste regole: ${answerMethod}
 Domanda dell'utente: ${userQuery}.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Errore nell'elaborazione della risposta:", error);

    // Handle specific error types
    if (error.message?.includes("API_KEY")) {
      return "Errore di configurazione: chiave API non valida.";
    } else if (error.message?.includes("quota")) {
      return "Limite di utilizzo raggiunto. Riprova più tardi.";
    } else if (error.message?.includes("safety")) {
      return "La domanda contiene contenuti non appropriati.";
    }

    return "Si è verificato un errore nel generare la risposta. Riprova più tardi.";
  }
}
