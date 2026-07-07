import { FaMicrophone } from "react-icons/fa";

function MicrophoneButton({ onClick, isListening }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px",
        fontSize: "22px",
        cursor: "pointer",
        borderRadius: "50%",
        border: "none",
        backgroundColor: isListening ? "#ff4d4f" : "#1976d2",
        color: "white",
        transition: "all 0.3s ease",
        transform: isListening ? "scale(1.15)" : "scale(1)",
        boxShadow: isListening
          ? "0 0 20px rgba(255,77,79,0.8)"
          : "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <FaMicrophone />
    </button>
  );
}

export default MicrophoneButton;