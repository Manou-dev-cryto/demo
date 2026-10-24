const questions = [
  {
    category: "SYSTÈME SOLAIRE",
    icon: "🪐",
    question: "Quelle est la plus grande planète de notre système solaire ?",
    answers: ["Saturne", "Jupiter", "Neptune", "Uranus"],
    correct: 1
  },
  {
    category: "LA LUNE",
    icon: "🌙",
    question: "Combien de temps environ la Lune met-elle pour faire le tour de la Terre ?",
    answers: ["24 heures", "7 jours", "27 jours", "365 jours"],
    correct: 2
  },
  {
    category: "EXPLORATION SPATIALE",
    icon: "🚀",
    question: "Qui fut le premier humain à marcher sur la Lune ?",
    answers: ["Youri Gagarine", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"],
    correct: 2
  },
  {
    category: "LES PLANÈTES",
    icon: "🔴",
    question: "Quelle planète surnomme-t-on la planète rouge ?",
    answers: ["Vénus", "Mars", "Mercure", "Jupiter"],
    correct: 1
  },
  {
    category: "NOTRE ÉTOILE",
    icon: "☀️",
    question: "Combien de temps la lumière du Soleil met-elle à atteindre la Terre ?",
    answers: ["Environ 8 minutes", "Environ 8 secondes", "Environ 1 heure", "Environ 1 jour"],
    correct: 0
  },
  {
    category: "SATELLITES",
    icon: "🛰️",
    question: "Comment s’appelle le télescope spatial lancé en 2021 ?",
    answers: ["Hubble", "Kepler", "James-Webb", "Spitzer"],
    correct: 2
  },
  {
    category: "LES PLANÈTES",
    icon: "💍",
    question: "Quelle planète est célèbre pour ses magnifiques anneaux ?",
    answers: ["Saturne", "Mars", "Terre", "Vénus"],
    correct: 0
  },
  {
    category: "LA TERRE",
    icon: "🌍",
    question: "Quelle est la couche gazeuse qui entoure notre planète ?",
    answers: ["La biosphère", "L’atmosphère", "La lithosphère", "L’hydrosphère"],
    correct: 1
  },
  {
    category: "GALAXIES",
    icon: "🌌",
    question: "Dans quelle galaxie se trouve notre système solaire ?",
    answers: ["Andromède", "Le Grand Nuage de Magellan", "La Voie lactée", "La galaxie du Sombrero"],
    correct: 2
  },
  {
    category: "EXPLORATION SPATIALE",
    icon: "🤖",
    question: "Quel est le nom du rover de la NASA arrivé sur Mars en 2021 ?",
    answers: ["Curiosity", "Perseverance", "Opportunity", "Sojourner"],
    correct: 1
  }
];

const countElement = document.querySelector("#question-count");
const scoreElement = document.querySelector("#score");
const categoryElement = document.querySelector("#category");
const planetIcon = document.querySelector(".planet-icon");
const questionElement = document.querySelector("#question");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const quizContent = document.querySelector("#quiz-content");
const resultsElement = document.querySelector("#results");
const progressBar = document.querySelector('[role="progressbar"]');
const progressFill = document.querySelector(".progress-fill");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const question = questions[currentQuestion];
  countElement.innerHTML = `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} <span class="muted">/ ${questions.length}</span>`;
  planetIcon.textContent = question.icon;
  categoryElement.textContent = question.category;
  questionElement.textContent = question.question;
  answersElement.replaceChildren();
  feedbackElement.textContent = "";
  feedbackElement.classList.remove("is-wrong");
  nextButton.hidden = true;
  progressBar.setAttribute("aria-valuenow", String(currentQuestion));
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span class="answer-text"></span>`;
    button.querySelector(".answer-text").textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersElement.append(button);
  });
}

function selectAnswer(selectedIndex) {
  const question = questions[currentQuestion];
  const answerButtons = [...answersElement.querySelectorAll(".answer")];
  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) button.classList.add("correct");
    if (index === selectedIndex && index !== question.correct) button.classList.add("incorrect");
  });

  if (selectedIndex === question.correct) {
    score += 1;
    scoreElement.textContent = String(score);
    feedbackElement.textContent = "Bien joué, c’est la bonne réponse !";
  } else {
    feedbackElement.textContent = `Pas tout à fait ! La bonne réponse était : ${question.answers[question.correct]}.`;
    feedbackElement.classList.add("is-wrong");
  }

  nextButton.textContent = currentQuestion === questions.length - 1 ? "VOIR MON RÉSULTAT" : "QUESTION SUIVANTE →";
  nextButton.hidden = false;
  nextButton.focus();
}

function showResults() {
  const percentage = score / questions.length;
  const title = percentage === 1 ? "Explorateur·rice légendaire !" : percentage >= 0.7 ? "Super, astronaute !" : percentage >= 0.4 ? "Belle exploration !" : "Le voyage ne fait que commencer !";
  const icon = percentage === 1 ? "🏆" : percentage >= 0.7 ? "🌟" : percentage >= 0.4 ? "🛸" : "🌠";
  quizContent.hidden = true;
  resultsElement.hidden = false;
  progressBar.setAttribute("aria-valuenow", String(questions.length));
  progressFill.style.width = "100%";
  resultsElement.innerHTML = `
    <div class="result-icon" aria-hidden="true">${icon}</div>
    <h2>${title}</h2>
    <p class="result-score">Tu as obtenu <strong>${score} / ${questions.length}</strong> bonnes réponses.</p>
    <button class="restart-button" type="button">REJOUER LA MISSION <span aria-hidden="true">↻</span></button>
  `;
  resultsElement.querySelector(".restart-button").addEventListener("click", restartQuiz);
  resultsElement.querySelector(".restart-button").focus();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreElement.textContent = "0";
  quizContent.hidden = false;
  resultsElement.hidden = true;
  showQuestion();
  answersElement.querySelector("button")?.focus();
}

nextButton.addEventListener("click", () => {
  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    showResults();
  } else {
    showQuestion();
    answersElement.querySelector("button").focus();
  }
});

showQuestion();
