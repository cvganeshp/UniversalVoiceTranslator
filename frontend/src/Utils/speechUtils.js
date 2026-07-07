export function speakText(text, language) {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-Speech is not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  const languageMap = {
    en: "en-IN",
    kn: "kn-IN",
    hi: "hi-IN",
    ta: "ta-IN",
    te: "te-IN",
    ml: "ml-IN",
  };

  utterance.lang = languageMap[language] || "en-IN";

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}