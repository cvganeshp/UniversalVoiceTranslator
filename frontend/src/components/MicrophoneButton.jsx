import { FaMicrophone } from "react-icons/fa";

function MicrophoneButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px",
        fontSize: "22px",
        cursor: "pointer",
        borderRadius: "50%",
      }}
    >
      <FaMicrophone />
    </button>
  );
}

export default MicrophoneButton;