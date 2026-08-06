import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function VoiceRecorder({ onTranscript, disabled = false }) {
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
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <button type="button" disabled>
        Browser doesn't support Speech Recognition
      </button>
    );
  }

  const handleClick = () => {
    console.log("Button clicked");

    console.log({
      listening,
      browserSupportsSpeechRecognition,
      disabled,
    });

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();

      SpeechRecognition.startListening({
        continuous: false,
        language: "en-IN",
      })
        .then(() => {
          console.log("Listening started");
        })
        .catch((err) => {
          console.error("Speech error:", err);
        });
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
        cursor: "pointer",
      }}
    >
      {listening ? "🎙 Listening..." : "🎤 Speak Task"}
    </button>
  );
}
