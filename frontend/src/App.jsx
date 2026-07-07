import { useState } from "react";
import MicrophoneButton from "./components/MicrophoneButton";
import { startSpeechRecognition } from "./services/speechService";
import { translateText } from "./services/translationService";

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [sourceLanguage, setSourceLanguage] = useState("kn");
  const [targetLanguage, setTargetLanguage] = useState("hi");

  const handleTranslation = async (inputText) => {
    try {
      const translated = await translateText(
        inputText,
        sourceLanguage,
        targetLanguage
      );

      setTranslatedText(translated);
    } catch (error) {
      alert("Unable to translate.");
      console.error(error);
    }
  };

  const startListening = () => {
    startSpeechRecognition(
      sourceLanguage,
      async (recognizedText) => {
        setText(recognizedText);
        await handleTranslation(recognizedText);
      },
      (error) => {
        alert("Speech recognition failed: " + error);
      }
    );
  };

  const handleTranslateClick = async () => {
    await handleTranslation(text);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Universal Voice Translator
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: 1 }}>
          <label>From Language</label>

          <select
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="kn">Kannada</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label>To Language</label>

          <select
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="kn">Kannada</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="ml">Malayalam</option>
          </select>
        </div>
      </div>

      <textarea
        rows="6"
        style={{
          width: "100%",
          fontSize: "18px",
          padding: "10px",
        }}
        placeholder="Type text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleTranslateClick}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Translate
        </button>

        <MicrophoneButton onClick={startListening} />
      </div>

      <br />
      <br />

      <h2>Translated Text</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "15px",
          minHeight: "100px",
          fontSize: "20px",
          borderRadius: "5px",
        }}
      >
        {translatedText}
      </div>
    </div>
  );
}

export default App;