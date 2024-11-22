const MARVEL_API_KEY = "e68a214d78db55dc7ce56b8f9fd573f4";
const MARVEL_PRIVATE_KEY = "ee923f3a51654f13f4b0c5d1b99c85581b9ab754";

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 110;
let timerInterval;
let questions;

function fetchMarvelData() {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(
    ts + MARVEL_PRIVATE_KEY + MARVEL_API_KEY
  ).toString();

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_API_KEY}&hash=${hash}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data.results)
    .catch((error) => {
      console.error("Error fetching Marvel data:", error);
      return [];
    });
}

function generateQuestion(character, difficulty) {
  switch (difficulty) {
    case "easy":
      return `What is ${character.name}'s species?`;
    case "medium":
      const team = character.teams[0]?.name || "Unknown";
      return `Which team is ${character.name} associated with?`;
    case "hard":
      const firstComic = character.comics.items[0]?.name || "Unknown";
      return `What is ${character.name}'s first appearance?`;
    default:
      return "Error: Invalid difficulty";
  }
}

function createQuizQuestions(characters, difficulty) {
  const questions = [];
  characters.forEach((character) => {
    let incorrectOptions = [];
    while (incorrectOptions.length < 2) {
      let randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];
      if (
        randomCharacter.name !== character.name &&
        !incorrectOptions.includes(randomCharacter.name)
      ) {
        incorrectOptions.push(randomCharacter.name);
      }
    }

    const question = generateQuestion(character, difficulty);
    const correctAnswer = question.includes(":")
      ? question.split(":")[1].trim()
      : "";
    const questionText = question.split(":")[0];

    const questionObject = {
      question: questionText,
      answers: [correctAnswer, ...incorrectOptions],
      correctAnswerIndex: 0,
    };
    questions.push(questionObject);
  });
  return questions;
}

document.getElementById("start-button").addEventListener("click", () => {
  // Get the selected difficulty from the dropdown
  const selectedDifficulty = document.getElementById("difficulty").value;

  // Start the quiz
  startQuiz(selectedDifficulty);
});

function startQuiz(difficulty) {
  fetchMarvelData()
    .then((characters) => createQuizQuestions(characters, difficulty))
    .then((quizQuestions) => {
      questions = quizQuestions;
      startTimer();
      displayQuestion(questions[currentQuestionIndex]);
    });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
      nextQuestion();
    }
  }, 1000);
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar-fill");
  progressBar.style.width = `${
    (currentQuestionIndex / questions.length) * 100
  }%`;
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    document.getElementById("feedback").textContent = "Correct!";
    document.getElementById(
      "scoreboard"
    ).textContent = `Score: ${score}/${questions.length}`;
  } else {
    document.getElementById(
      "feedback"
    ).textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
  }

  clearInterval(timerInterval); // Stop the timer
  nextQuestion();
}

function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  questionElement.textContent = question.question;

  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";

  const shuffledAnswers = question.answers.slice(); // Create a copy
  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAnswers[i], shuffledAnswers[j]] = [
      shuffledAnswers[j],
      shuffledAnswers[i],
    ];
  }

  shuffledAnswers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () =>
      checkAnswer(index, question.correctAnswerIndex)
    );
    answersElement.appendChild(button);
  });

  updateProgressBar();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    startTimer();
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Quiz Over! Your score is ${score}/${questions.length}`;
  }
}
