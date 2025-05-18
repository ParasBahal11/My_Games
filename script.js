const tom = document.getElementById("tom");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

let mediaRecorder;
let audioChunks = [];
let recordedBlob;

async function startRecording() {
  try {
    statusText.textContent = "Recording...";
    tom.src = "talking_tom_listen.jpg";

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      recordedBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(recordedBlob);

      const audioContext = new AudioContext();
      fetch(audioUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;

          // Slightly higher pitch for cat-like voice (but clear)
          source.playbackRate.value = 1.3;

          source.connect(audioContext.destination);

          tom.src = "talking_tom.gif";
          statusText.textContent = "Tom is mimicking your voice 🐱...";

          source.start();

          source.onended = () => {
            tom.src = "talking_tom.jpg";
            statusText.textContent = "Click Start to Speak Again!";
            startBtn.disabled = false;
          };
        })
        .catch((err) => {
          console.error("Audio decode error:", err);
          statusText.textContent = "Playback error.";
          tom.src = "talking_tom.jpg";
          startBtn.disabled = false;
        });
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, 3000); // Record for 3 seconds
  } catch (error) {
    console.error("Error:", error);
    statusText.textContent = "Microphone access denied.";
    tom.src = "talking_tom.jpg";
    startBtn.disabled = false;
  }
}

startBtn.addEventListener("click", () => {
  if (!mediaRecorder || mediaRecorder.state === "inactive") {
    startBtn.disabled = true;
    startRecording();
  }
});
