export function startSpeechRecognition(language, onSuccess, onError) {
  if (!("webkitSpeechRecognition" in window)) {
    onError("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new window.webkitSpeechRecognition();

  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    onSuccess(event.results[0][0].transcript);
  };

  recognition.onerror = (event) => {
    onError(event.error);
  };

  recognition.start();
}