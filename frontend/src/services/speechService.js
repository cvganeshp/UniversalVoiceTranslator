export function startSpeechRecognition(language, onSuccess, onError) {
  if (!("webkitSpeechRecognition" in window)) {
    onError("Speech Recognition is not supported in this browser.");
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const result = event.results[0][0];

       
 onSuccess(result.transcript);

  };

  recognition.onerror = (event) => {
    onError(event.error);
  };

  recognition.start();
}