const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check API
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Universal Voice Translator Backend"
  });
});

// Mock Translation API
app.post("/translate", (req, res) => {
  const { text, sourceLanguage, targetLanguage } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text is required"
    });
  }

  // Mock translation for development
  const translatedText = `[${sourceLanguage} → ${targetLanguage}] ${text}`;

  res.json({
    success: true,
    originalText: text,
    sourceLanguage,
    targetLanguage,
    translatedText
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});