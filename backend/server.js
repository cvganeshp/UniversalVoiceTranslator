import express from "express";
import cors from "cors";
import { translate } from "@vitalets/google-translate-api";

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

    const result = await translate(text, {
      from: sourceLanguage,
      to: targetLanguage,
    });

    res.json({
      success: true,
      originalText: text,
      sourceLanguage,
      targetLanguage,
      translatedText: result.text,
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});