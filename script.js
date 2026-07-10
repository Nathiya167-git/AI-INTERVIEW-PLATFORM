/* ===================================================
   AI INTERVIEW PLATFORM
   script.js
=================================================== */

console.log("AI Interview Platform Loaded Successfully!");

document.addEventListener("DOMContentLoaded", () => {
  initializeInterview();
});

/* ===================================================
   INITIALIZE
=================================================== */

function initializeInterview() {
  setupCamera();

  setupMicrophone();

  setupQuestions();

  setupTimer();
}

/* ===================================================
   CAMERA
=================================================== */

function setupCamera() {
  const cameraBtn = document.getElementById("startCamera");

  if (!cameraBtn) return;

  cameraBtn.addEventListener("click", async () => {
    const video = document.getElementById("video");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      video.srcObject = stream;

      cameraBtn.innerHTML =
        '<i class="fa-solid fa-circle-check"></i> Camera Started';

      cameraBtn.disabled = true;
    } catch (error) {
      alert("Unable to access Camera");

      console.log(error);
    }
  });
}

/* ===================================================
   MICROPHONE + SPEECH TO TEXT
=================================================== */

function setupMicrophone() {
  const micBtn = document.getElementById("startMic");

  if (!micBtn) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.disabled = true;

    micBtn.innerHTML = "Speech Not Supported";

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = true;

  recognition.interimResults = true;

  let listening = false;

  micBtn.addEventListener("click", () => {
    if (!listening) {
      recognition.start();

      listening = true;

      micBtn.innerHTML =
        '<i class="fa-solid fa-microphone-lines"></i> Listening...';
    } else {
      recognition.stop();

      listening = false;

      micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i> Start Mic';
    }
  });

  recognition.onresult = function (event) {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    const answer = document.getElementById("answer");

    if (answer) {
      answer.value = transcript;
    }
  };
}

/* ===================================================
   TIMER
=================================================== */

function setupTimer() {
  const timer = document.getElementById("time");

  if (!timer) return;

  let totalSeconds = 600;

  setInterval(() => {
    if (totalSeconds <= 0) {
      alert("Interview Finished!");

      window.location.href = "/result";

      return;
    }

    totalSeconds--;

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    timer.innerHTML = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }, 1000);
}

/* ===================================================
   TEMPORARY QUESTIONS
   (Later Gemini will replace these)
=================================================== */

const questions = [
  "Tell me about yourself.",

  "Explain Object Oriented Programming.",

  "Difference between GET and POST.",

  "What is Python?",

  "What is Java?",

  "What is Flask?",

  "Explain SQL JOIN.",

  "Difference between List and Tuple.",

  "What is Inheritance?",

  "Why should we hire you?",
];

let currentQuestion = 0;

/* ===================================================
   QUESTIONS
=================================================== */

function setupQuestions() {
  const generateBtn = document.getElementById("generateQuestion");

  const nextBtn = document.getElementById("nextQuestion");

  const finishBtn = document.getElementById("finishInterview");

  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      showQuestion();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextQuestion();
    });
  }

  if (finishBtn) {
    finishBtn.addEventListener("click", () => {
      finishInterview();
    });
  }
}

function showQuestion() {
  document.getElementById("question").innerHTML = questions[currentQuestion];
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
  }

  document.getElementById("answer").value = "";

  showQuestion();
}

function finishInterview() {
  if (confirm("Are you sure you want to finish the interview?")) {
    window.location.href = "/result";
  }
}
/*==================================
RESULT PAGE
==================================*/

function loadResult() {
  const scoreElement = document.getElementById("score");

  if (!scoreElement) return;

  const candidate = document.getElementById("candidateName");

  const domain = document.getElementById("domainName");

  const answered = document.getElementById("answered");

  const progress = document.getElementById("progressBar");

  const feedback = document.getElementById("feedback");

  // Temporary values

  let score = Math.floor(Math.random() * 41) + 60;

  //60-100

  candidate.innerHTML = "Nathiya";

  domain.innerHTML = localStorage.getItem("domain") || "Java";

  answered.innerHTML = "10 / 10";

  scoreElement.innerHTML = score + "%";

  progress.style.width = score + "%";

  if (score >= 90) {
    feedback.innerHTML =
      "Excellent performance! You demonstrated strong technical knowledge and communication skills.";

    progress.style.background = "green";
  } else if (score >= 75) {
    feedback.innerHTML =
      "Very Good performance. Your concepts are clear. Improve confidence while answering.";

    progress.style.background = "orange";
  } else {
    feedback.innerHTML =
      "Needs Improvement. Practice more coding and interview questions.";

    progress.style.background = "red";
  }
}

document.addEventListener("DOMContentLoaded", loadResult);

function downloadReport() {
  alert("PDF Download will be added after Firebase integration.");
}
