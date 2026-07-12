export async function speakText(text, language) {
  console.log("Calling Azure Speech...");
  console.log(text, language);

  const response = await fetch("http://localhost:3000/speak", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      language,
    }),
  });

  console.log("Status:", response.status);

  const blob = await response.blob();

  console.log("Received audio blob:", blob);

  const audioUrl = URL.createObjectURL(blob);

const audio = new Audio();
audio.src = audioUrl;

audio.oncanplaythrough = async () => {
  try {
    await audio.play();
    console.log("Azure speech is playing...");
  } catch (e) {
    console.error(e);
  }
};
}