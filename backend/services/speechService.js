import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export async function speakText(text, voiceName) {
  return new Promise((resolve, reject) => {

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );

    speechConfig.speechSynthesisVoiceName = voiceName;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        synthesizer.close();
        resolve(result.audioData);
      },
      (error) => {
        synthesizer.close();
        reject(error);
      }
    );
  });
}