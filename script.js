const MARVEL_API_KEY = "e68a214d78db55dc7ce56b8f9fd573f4";
const MARVEL_PRIVATE_KEY = "ee923f3a51654f13f4b0c5d1b99c85581b9ab754";
const SPOTIFY_CLIENT_ID = "aa6ce2d4f91148baa2bbadc81b66b973";
const SPOTIFY_CLIENT_SECRET = "432c22ba30cc498686dcf5c09ab7de21";

async function fetchMarvelData() {
  const ts = new Date().getTime();
  const hash = CryptoJS.MD5(
    ts + MARVEL_PRIVATE_KEY + MARVEL_API_KEY
  ).toString();

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_API_KEY}&hash=${hash}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error("Error fetching Marvel data:", error);
    return [];
  }
}

function createQuizQuestions(characters) {
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

    const question = {
      question: `Who is ${character.name}?`,
      answers: [character.description, ...incorrectOptions],
      correctAnswer: 0,
    };
    questions.push(question);
  });
  return questions;
}

let currentQuestionIndex = 0;
let score = 0;
document.getElementById("next-button").disabled = true;

function checkAnswer(selectedAnswer, correctAnswer) {
  // Check if the selected answer is correct
  if (selectedAnswer === correctAnswer) {
    // The answer is correct, do something, e.g., display a message
    alert("Correct!");
  } else {
    // The answer is incorrect, do something, e.g., display a message
    alert("Incorrect. The correct answer is: " + correctAnswer);
  }

  // Enable the "Next Question" button regardless of the answer
  document.getElementById("next-button").disabled = false;
}

document.getElementById("next-button").addEventListener("click", () => {
  nextQuestion();
  document.getElementById("next-button").disabled = true;
});
function displayQuestion(question) {
  const questionElement = document.getElementById("question");
  questionElement.textContent = question.question;

  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () =>
      checkAnswer(index, question.correctAnswer)
    );
    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    playCorrectSound().catch((error) =>
      console.error("Error playing correct sound:", error)
    );
    return;
  } else {
    playIncorrectSound().catch((error) =>
      console.error("Error playing incorrect sound:", error)
    );
  }

  // Display the result and the next question
  displayResult(selectedAnswer === correctAnswer);
  nextQuestion();
}

function displayResult(isCorrect) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = isCorrect ? "Correct!" : "Incorrect.";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    // Quiz is over, display final score
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Quiz Over! Your score is ${score}/${questions.length}`;
  }
}
function displayQuestionAndResult(data) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = data.isCorrect ? "Correct!" : "Incorrect.";

  const questionElement = document.getElementById("question");
  questionElement.textContent = data.question;

  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";

  data.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () =>
      checkAnswer(index, data.correctAnswer)
    );
    answersElement.appendChild(button);
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    // Quiz is over, display final score
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Quiz Over! Your score is ${score}/${questions.length}`;
  }
}
async function startQuiz() {
  const characters = await fetchMarvelData();
  const questions = createQuizQuestions(characters);
  currentQuestionIndex = 0;
  displayQuestion(questions[currentQuestionIndex]);
}

startQuiz();
// ... (Quiz logic)
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

async function getAccessToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (error) {
    console.error("Error getting token:", error);
    // Handle error and display message to user (optional)
  }
}

async function playSound(uri) {
  await getAccessToken();
  spotifyApi.play({ uris: [uri] });
}

function playCorrectOrIncorrectSound(isCorrect) {
  const trackUri = isCorrect
    ? "spotify:track:your_correct_answer_track_id"
    : "spotify:track:your_incorrect_answer_track_id";
  playSound(trackUri);
}

playCorrectOrIncorrectSound(true); // Example usage (replace with logic)
