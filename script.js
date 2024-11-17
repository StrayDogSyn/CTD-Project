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

// Implement functions to interact with Spotify API using SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET

function createQuizQuestions(characters) {
  const questions = [];
  characters.forEach((character) => {
    const question = {
      question: `Who is ${character.name}?`,
      answers: [
        character.description,
        // Add more incorrect options here
      ],
      correctAnswer: 0, // Index of the correct answer
    };
    questions.push(question);
  });
  return questions;
}
let currentQuestionIndex = 0;
let score = 0;

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
    // Play a correct answer sound effect from Spotify
    playCorrectSound();
  } else {
    // Play an incorrect answer sound effect from Spotify
    playIncorrectSound();
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
async function startQuiz() {
  const characters = await fetchMarvelData();
  const questions = createQuizQuestions(characters);
  currentQuestionIndex = 0;
  displayQuestion(questions[currentQuestionIndex]);
}

// (Optional) Play Spotify music using the Spotify Web Playback SDK
// See: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

function startMusic() {
  // Implement logic to use Spotify Web Playback SDK
}

startQuiz();
// ... (Quiz logic)

const player = new Spotify.Player({
  name: "Marvel Quiz",
  getOAuthToken: (cb) => {
    // Implement OAuth token retrieval logic here using your Client ID and Client Secret
    // You'll need to obtain an access token and call cb(accessToken)
  },
});

player.addListener("initialization_error", ({ message }) => {
  console.error(message);
});
player.addListener("authentication_error", ({ message }) => {
  console.error(message);
});
player.addListener("account_error", ({ message }) => {
  console.error(message);
});
player.addListener("playback_error", ({ message }) => {
  console.error(message);
});

// Ready event
player.addListener("ready", ({ device_id }) => {
  console.log("Ready with Device ID", device_id);
});

// Not Ready event
player.addListener("not_ready", ({ device_id }) => {
  console.log("Device ID has gone offline", device_id);
});

player.connect();
function playCorrectSound() {
  player.play({
    uris: ["spotify:track:your_correct_answer_track_id"],
  });
}

function playIncorrectSound() {
  player.play({
    uris: ["spotify:track:your_incorrect_answer_track_id"],
  });
}
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: "YOUR_REDIRECT_URI",
});

spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body["access_token"]);
    // Now you can use the Spotify Web API to fetch track information, play music, etc.
  })
  .catch((error) => {
    console.error("Error getting token:", error);
  });
