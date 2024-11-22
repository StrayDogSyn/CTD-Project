let score = 0;
let timeLeft = 30;
let timerInterval;

function getRandomQuestion(difficulty) {
  const choice = Math.random() < 0.5 ? "films" : "people";
  const url = `https://swapi.dev/api/${choice}/?random=true`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let question;
      if (choice === "films") {
        question = `What is the opening crawl of episode ${data.episode_id}?`;
      } else {
        question = `What is the homeworld of ${data.name}?`;
      }

      document.getElementById("question").textContent = question;

      // Adjust question difficulty based on difficulty level
      if (difficulty === "easy") {
        // Generate simpler multiple-choice questions
        const easyOptions = ["Human", "Droid", "Wookiee", "Other"];
        const randomEasyOption =
          easyOptions[Math.floor(Math.random() * easyOptions.length)];
        question += `\nHint: This character is a ${randomEasyOption}.`;
      } else if (difficulty === "medium") {
        // Generate fill-in-the-blank questions with clues
        if (choice === "films") {
          question += `\nHint: This film is directed by a famous filmmaker.`;
        } else {
          question += `\nHint: This character is a powerful Jedi.`;
        }
      } else if (difficulty === "hard") {
        // Generate true/false questions about obscure lore
        if (choice === "films") {
          question += "\nTrue or False: This film features a major plot twist.";
        } else {
          question +=
            "\nTrue or False: This character is a Force-sensitive species.";
        }
      }

      // Generate random answers (including the correct one)
      const answers = [
        data[choice === "films" ? "opening_crawl" : "homeworld"],
      ];
      for (let i = 1; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        answers.push(
          data.results[randomIndex][
            choice === "films" ? "opening_crawl" : "homeworld"
          ]
        );
      }

      // Shuffle the answers
      answers.sort(() => Math.random() - 0.5);

      // Assign answers to buttons
      document.getElementById("answer1").textContent = answers[0];
      document.getElementById("answer2").textContent = answers[1];
      document.getElementById("answer3").textContent = answers[2];
      document.getElementById("answer4").textContent = answers[3];

      // Fetch and display image based on question category
      if (choice === "people") {
        const imageUrl = data.url + "images/1";
        document.getElementById("image").src = imageUrl;
      } else {
        // Handle image display for films (e.g., using TMDb API or image download library)
        // You can use a service like The Movie Database (TMDb) to fetch movie posters
        // or use a library to download images from specific URLs.
      }

      // Set click event listeners for answers
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("click", () =>
          checkAnswer(button.textContent, choice, data)
        );
      });

      // Start the timer
      startTimer();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display an error message to the user
    });
}

function checkAnswer(answer, category, data) {
  const correctAnswer =
    data[category === "films" ? "opening_crawl" : "homeworld"];
  const feedback = document.getElementById("feedback");

  if (answer === correctAnswer) {
    feedback.textContent = "Correct!";
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
  } else {
    feedback.textContent = `Incorrect. The answer is: ${correctAnswer}`;
  }

  // Clear feedback after a short delay
  setTimeout(() => {
    feedback.textContent = "";
  }, 2000);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Handle time-out (e.g., display a message, disable buttons)
      alert("Time's up!");
    }
  }, 1000);
}

function restartQuiz() {
  score = 0;
  document.getElementById("score").textContent = "Score: 0";
  getRandomQuestion("medium");
}

// Event listeners
document
  .getElementById("nextButton")
  .addEventListener("click", getRandomQuestion);
document.getElementById("restartButton").addEventListener("click", restartQuiz);

// Start the game
getRandomQuestion("medium");
