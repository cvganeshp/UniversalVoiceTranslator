export async function translateText(
  text,
  sourceLanguage,
  targetLanguage
) {
  const response = await fetch("http://localhost:3000/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      sourceLanguage,
      targetLanguage,
    }),
  });

  if (!response.ok) {
    throw new Error("Translation failed");
  }

  const data = await response.json();

  return data.translatedText;
}