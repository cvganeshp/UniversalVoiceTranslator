import axios from "axios";

export async function translateText(text, sourceLanguage, targetLanguage) {
  const prompt = `
Translate the following text from ${sourceLanguage} to ${targetLanguage}.

Rules:
- Translate the intended meaning, not word-for-word.
- Use natural conversational language.
- Return ONLY the translated text.
- No explanation.
- No quotation marks.

Text:
${text}
`;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await axios.post(url, {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  });

  return response.data.candidates[0].content.parts[0].text.trim();
}