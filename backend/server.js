import { speakText } from "./services/speechService.js";
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { translateText } from "./services/translationService.js";

dotenv.config();
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Universal Voice Translator Backend",
  });
});

app.post("/translate", async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Text is required",
      });
    }

   const translatedText = await translateText(
  text,
  sourceLanguage,
  targetLanguage
);

res.json({
  success: true,
  originalText: text,
  sourceLanguage,
  targetLanguage,
  translatedText,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Translation failed",
      details: error.message,
    });
  }
});
app.post("/speak", async (req, res) => {
  try {
    const { text, language } = req.body;

    const voices = {
      en: "en-US-JennyNeural",
      hi: "hi-IN-SwaraNeural",
      kn: "kn-IN-SapnaNeural",
      ta: "ta-IN-PallaviNeural",
      te: "te-IN-ShrutiNeural",
      ml: "ml-IN-SobhanaNeural",
    };

    const audio = await speakText(
      text,
      voices[language] || "en-US-JennyNeural"
    );

    res.setHeader("Content-Type", "audio/wav");
    res.send(Buffer.from(audio));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Speech synthesis failed",
    });
  }
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});