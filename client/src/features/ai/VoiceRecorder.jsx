import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceRecorder({
  onTranscript,
  disabled = false,
}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript.trim()) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [listening, transcript, onTranscript, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <button type="button" disabled>
        Browser doesn't support Speech Recognition
      </button>
    );
  }

  const handleClick = async () => {
    console.log("Button clicked");

    console.log({
      listening,
      browserSupportsSpeechRecognition,
      disabled,
    });

    if (listening) {
      SpeechRecognition.stopListening();
      return;
    }

    resetTranscript();

    try {
      await SpeechRecognition.startListening({
        continuous: false,
        language: "en-IN",
      });

      console.log("Listening started");
    } catch (err) {
      console.error("Speech Recognition Error:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "10px",
        border: "none",
        background: listening ? "#ef4444" : "#7c3aed",
        color: "white",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {listening ? "🎙 Listening..." : "🎤 Speak Task"}
    </button>
  );
}