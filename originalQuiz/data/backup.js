// code adapted from; -- JavaScript: Novice to Ninja 2014 -- see bottom of page for works cited section //
(function () {
  "use strict";

  //// dom references ////
  let $question = document.getElementById("question");
  let $score = document.getElementById("score");
  let $feedback = document.getElementById("feedback");
  let $start = document.getElementById("start");
  let $form = document.getElementById("answer");
  let $timer = document.getElementById("timer");
  let $correct = document.getElementById("correct");

  /// view functions ///

  function update(element, content, klass) {
    let p = element.firstChild || document.createElement("p");
    p.textContent = content;
    element.appendChild(p);
    if (klass) {
      p.className = klass;
    }
  }
  // Event listeners
  $start.addEventListener('click', function() {
    new Game(quiz);
  }, false);

  //// game default settings
  let score = 0;
  update($score, score);

  function hide(element) {
    element.style.display = "none";
  }
  function show(element) {
    element.style.display = "block";
  }
  hide($form);

  //replace main play() function with constructor
function Game(quiz) {
  this.questions = quiz.questions;
  this.phrase = quiz.question;
  this.score = 0; // initialize score
  update($score, this.score);
  // initialize timer and set up an interval that counts down
  this.time = 240;
  update($timer, this.time);
  this.interval = window.setInterval(this.countDown.bind(this), 1000);
  // hide button and show form
  hide($start);
  show($form);
  // add event listener to form when it's submitted
  $form.addEventListener('click', function(event){
    event.preventDefault();
    this.check(event.target.value);
  }.bind(this), false);
  this.chooseQuestion();

// Method definitions
Game.prototype.chooseQuestion = function() {
  console.log('chooseQuestion() called');
  let questions = this.questions.filter(function(question){
    return question.asked === false;
  });
  // set the current question
  this.question = questions[random(questions.length) - 1];
  this.ask(this.question);
};
Game.prototype.ask = function(question) {
  console.log('ask() called');
  let quiz = this;
  // set the question.asked property to true so it's not asked again
  question.asked = true;
  update($question, this.phrase + question.question);
  // clear the previous options
  $form.innerHTML = "";
  // create an array to put the different options in and a button variable
  let options = [], button;
  let option1 = chooseOption();
  options.push(option1.answer);
  let option2 = chooseOption();
  options.push(option2.answer);
  // add the actual answer in a random place in the options array
  options.splice(random(0,2), 0, this.question.amswer);
  // loop through each option and display it as a button
  options.forEach(function(name){
    button = document.createElement('button');
    button.value = name;
    button.textContent = name;
    $form.appendChild(button);
  });
  // choose an option from all the possible answers but without choosing the answer or the same option twice
  function chooseOption() {
    let option = quiz.questions[random(quiz.questions.length) -1];
    // check to see if the option chosen is the current question or already one of the options, if it is then recursively call this function until it isn't
      if(option === question || options.indexOf(option.answer) !== -1) {
        return chooseOption();
      }
      return option;
  }
};
Game.prototype.check = function(answer) {
  console.log('check() called');
  if(answer === this.question.answer) {
    update($feedback, 'Correct!', 'correct');
    // increase score by 1
    this.score++;
    update($score, this.score);
  } else {
    update($feedback, 'Wrong!', 'wrong');
  }
  this.chooseQuestion();
};
Game.prototype.countDown = function() {
  // this is called every second and decreases the time
  this.time--;
  // update the time displayed
  update($timer, this.time);
  // the game is over if the timer reaches zero
  if(this.time <= 0) {
    this.gameOver();
  }
};
Game.prototype.gameOver = function() {
  console.log('gameOver() invoked');
  // inform the player that the game has finished and tell them how many points they have scored
  update($question, 'Game Over, you scored ' + this.score + ' points');
  // stop the countdown interval
  window.clearInterval(this.interval);
  hide($form);
  show($start);
};
Game.prototype.hiScore = function() {
  if(window.localStorage) {
    let hi = localStorage.getItem('hiScore', this.score);
  }
  return localStorage.getItem('hiScore');
};
}// end functon Game(quiz)
  // Questions object
  let quiz;
  quiz = {
    "name": "Comic Book Nerd Ninja",
    "description": "How Marvelous is Round One",
    "question": "   ",
    "questions": [
      { "question": "What was Wolverine's original code name", "answer": "Weapon X", "asked": false },
      { "question": "What group does 'Starlord' lead", "answer": "Guardians of the Galaxy", "asked": false },
      { "question": "Who was the older brother of Cyclops", "answer": "Havoc", "asked": false },
      { "question": "What is Black Widow's real name", "answer": "Natasha Romanov", "asked": false },
      { "question": "Which Asgardian guards the Bifrost", "answer": "Heimdal", "asked": false },
      { "question": "Ms. Marvel is part of what new team", "answer": "New Avengers", "asked": false },
      { "question": "Who is the ancient mutant that created the 'Four Horseman' to serve him", "answer": "Apocalypse", "asked": false },
      { "question": "What is the symbiotes greatest weakness", "answer": "ultra-sonics", "asked": false },
      { "question": "Who is the blind Defender of Hell's Kichen", "answer": "Daredevil", "asked": false },
      { "question": "Which double-agent did Hawkeye turn into a loyal S.H.E.I.L.D. operative", "answer": "Black Widow", "asked": false },
      { "question": "Which Uncanny X-Men member has the power to teleport anywhere they can envision", "answer": "Nightcrawler", "asked": false },
      { "question": "Which Avenger was the original magic-user of the team before Doctor Strange", "answer": "Scarlet Witch", "asked": false },
      { "question": "Which mutant inadvertently stopped the Secret Invasion with his cancerous cells", "answer": "Deadpool", "asked": false },
      { "question": "Which powerful superheroine's powers are light-based", "answer": "Captain Marvel", "asked": false },
      { "question": "Which diabolical demi-god is held at bay by the Sorcerer Supreme and the Outsiders", "answer": "Dormammu", "asked": false },
      { "question": "What is Wolverine's real name", "answer": "James Logan", "asked": false },
      { "question": "Who was the Green Goblin's successor", "answer": "Hobgoblin", "asked": false },
      { "question": "Which mercenary villian can copy any style of combat they see", "answer": "Taskmaster", "asked": false },
      { "question": "What is Beast's real name", "answer": "Dr. Hank McCoy", "asked": false },
      { "question": "Which web-slinger is actually a feral mutant clone of Peter Parker", "answer": "Spider Doppleganger", "asked": false },
      { "question": "What is the name of the secret organization that infiltrated the ranks of S.H.E.I.L.D. (acronym)", "answer": "H.Y.D.R.A.", "asked": false },
      { "question": "Who does Venom blame for all his percieved misfortunes", "answer": "Spiderman", "asked": false },
      { "question": "Who became 'Agent Venom' in order to regain their ability to walk again", "answer": "Flash Thompson", "asked": false },
      { "question": "Who was the First Avenger", "answer": "Captain America", "asked": false },
      { "question": "Who is Iron Man", "answer": "Tony Stark", "asked": false },
      { "question": "Who is Ant-man's partner", "answer": "Wasp", "asked": false },
      { "question": "Doctor Doom is the arch-nemesis of which group of superheroes", "answer": "Fantastic Four", "asked": false },
      { "question": "Which of the Marvels can see as well as manipulate light on any spectrum", "answer": "Marvel Girl", "asked": false },
      { "question": "What is The Thing's real name", "answer": "Ben Grimm", "asked": false },
      { "question": "What is the Iron Man suit piloted by Colonel Brody called", "answer": "War Machine", "asked": false },
      { "question": "What group includes the heroes of New York's various burroughs", "answer": "Defenders", "asked": false },
      { "question": "The second Black Widow is part of what team", "answer": "Thunderbolts", "asked": false },
      { "question": "What is the friendly, neighborhood Spiderman's real name", "answer": "Peter Parker", "asked": false },
      { "question": "Which Outsider gained his powers from an infernal contract with the devil Blackheart", "answer": "Ghost Rider", "asked": false },
      { "question": "Which former mentor of Peter Parker's became a supervillain when an accident permanently grafted several robotic arms to his back", "answer": "Doctor Octopus", "asked": false },
      { "question": "Which web-slinger has unique psionic powers unlike any of the others", "answer": "Spider-Woman", "asked": false },
      { "question": "Where is Blank Panther from", "answer": "Wakanda", "asked": false },
      { "question": "What is the name of the intelligent plant-being on Starlords team", "answer": "Groot", "asked": false },
      { "question": "Who is the team leader of the Uncanny X-Men", "answer": "Cyclops", "asked": false },
      { "question": "Which Uncanny X-Men member was able to produce blinding pyrotechnics from their hands", "answer": "Jubilee", "asked": false },
      { "question": "Which Spiderman villain uses the powers of illusion and deception to mimic extraordinary powers", "answer": "Mysterio", "asked": false },
      { "question": "Which of the Defenders is the master of all martial art forms", "answer": "Iron Fist", "asked": false },
      { "question": "Whose is the declared rival of the, 'Merc with the Mouth'", "answer": "Wolverine", "asked": false },
      { "question": "Who founded the X-Men Academy", "answer": "Professor Charles Xavier", "asked": false },
      { "question": "Who is the leader of the Inhumans", "answer": "Black Bolt", "asked": false },
      { "question": "Which Guardian of the Galaxy lives only to avenge his dead family", "answer": "Drax the Destroyer", "asked": false },
      { "question": "Which Uncanny X-Men has the ability to turn his skin into metal", "answer": "Colossus", "asked": false },
      { "question": "Who was Patriot before he took the place of the First Avenger", "answer": "Falcon", "asked": false },
      { "question": "Who is the Dark Avenger Iron Man", "answer": "Norman Osborn", "asked": false },
      { "question": "What is the First Avenger's real name", "answer": "Steve Rogers", "asked": false },
      { "question": "Omega Red, Wolverine, Deadpool, and '        ' made up the original Weapon X team...", "answer": "Sabertooth", "asked": false },
      { "question": "Which Avenger is in possession of Mjolnir", "answer": "Thor", "asked": false },
      { "question": "Which flying mutant was turned into a Horseman by Apocalypse", "answer": "Archangel", "asked": false },
      { "question": "Which mutant is able to glide using his powerful voice", "answer": "Banshee", "asked": false },
      { "question": "Which reptilian supervillain was only attempting to regrow his missing arm", "answer": "The Lizard", "asked": false },
      { "question": "What is the prime directive of the Sentinel program", "answer": "Neutralize Mutants", "asked": false },
      { "question": "Which Brotherhood mutant closely resembles a common amphibian", "answer": "Toad", "asked": false },
      { "question": "Which Guardian of the Galaxy is a powerful empath", "answer": "Mantis", "asked": false },
      { "question": "What is Venom's real name", "answer": "Eddie Brock", "asked": false },
      { "question": "Which vigilante's fatal methods are considered too extreme by the Avengers", "answer": "Punisher", "asked": false },
      { "question": "Which of the original X-Men could literally freeze the air around themselves", "answer": "Iceman", "asked": false },
      { "question": "Which Holocaust survivor created the satellite 'Asteroid M' as a sanctuary for mutants", "answer": "Magneto", "asked": false },
      { "question": "Which race colonized a significant portion of the known galaxy", "answer": "Kree", "asked": false },
      { "question": "Who is the brother of The Invisible Girl", "answer": "The Human Torch", "asked": false },
      { "question": "Who wouldn't you like to see get angry", "answer": "Incredible Hulk", "asked": false },
      { "question": "Whose catchprase is, 'It's Clobberin Time!'", "answer": "The Thing", "asked": false },
      { "question": "Who is married to Mr. Fantastic", "answer": "The Invisible Girl", "asked": false },
      { "question": "Which member of the X-Men team suffers from debilitating claustrophobia", "answer": "Storm", "asked": false },
      { "question": "Which mutant underwent the risky adamantium skeletal bonding process in hopes of being able to finally kill Logan", "answer": "Lady Deathstrike", "asked": false },
      { "question": "Which former member of Weapon X possesses adamantium tentacles capable of draining his foes", "answer": "Omega Red", "asked": false },
      { "question": "Which Marvel can convert light into matter", "answer": "Ms. Marvel", "asked": false },
      { "question": "Which race of shapeshifters nearly succeeded in their invasion of Earth", "answer": "Skrull", "asked": false },
      { "question": "Which Avenger's homeland is the hidden source of vibranium on Earth", "answer": "Black Panther", "asked": false },
      { "question": "Which artificial being gains his god-like powers from an Infinity Stone", "answer": "Vision", "asked": false },
      { "question": "Which former antagonist became a valued headmistress of 'Xavier's School for Gifted Children'", "answer": "Emma Frost", "asked": false },
      { "question": "Which former gambler was once part of a secret cabal of bayou cutthroats", "answer": "Gambit", "asked": false },
      { "question": "What was the Soviet Union's Iron Man called", "answer": "Red Dynamo", "asked": false },
      { "question": "What primary force is behind the leadership of the Kree Empire", "answer": "The Supreme Intelligence", "asked": false },
      { "question": "Which intergalactic traveler was known as a 'herald of doom' for Galactus, the World-Eater", "answer": "Silver Surfer", "asked": false },
      { "question": "Which time-traveling mutant has the ability to absorb and channel energy", "answer": "Bishop", "asked": false },
      { "question": "Which meta did the Venom symbiote allegedly fail to bond with due to their incurable insanity", "answer": "Deadpool", "asked": false },
      { "question": "Which supervillian killed Mary Jane Watson", "answer": "Green Goblin", "asked": false },
      { "question": "Where is the hidden city of the Inhumans located", "answer": "Earth's Moon", "asked": false },
      { "question": "The mysterious region buried near the Earth's core that negates mutant abilities is called", "answer": "The Savage Lands", "asked": false },
      { "question": "What is the name of Black Bolt's betrothed", "answer": "Medusa", "asked": false },
      { "question": "Which powerful inter-dimensional being guides Peter Parker across the multi-verse", "answer": "Madame Web", "asked": false },
      { "question": "What organization is Nick Fury the director of (acronym)", "answer": "S.H.E.I.L.D.", "asked": false },
      { "question": "Who is Magneto's son", "answer": "Quicksilver", "asked": false },
      { "question": "Which Outsider is known as the 'day-walker'", "answer": "Blade", "asked": false },
      { "question": "Which immortal supervillain is in control of the Ten Rings", "answer": "The Mandarin", "asked": false },
      { "question": "Which Outsider is also the latest Sorcerer Supreme", "answer": "Doctor Strange", "asked": false },
      { "question": "Which god was 'tricked' into believing he was Asgardian", "answer": "Loki", "asked": false },
      { "question": "Who is the Winter Soldier", "answer": "Bucky Barnes", "asked": false },
      { "question": "Who secretly is Nightcrawler's mother", "answer": "Mystique", "asked": false },
      { "question": "Who is the Dark Phoenix", "answer": "Jean Grey", "asked": false },
      { "question": "Which race of beings is actually a hybrid of humans and kree biology", "answer": "Inhumans", "asked": false },
      { "question": "Skrulls bio-engineered with powers to mimic certain meta-humans are called what", "answer": "Super Skrull", "asked": false },
      { "question": "Who is the 'Mad Titan'", "answer": "Thanos", "asked": false },
      { "question": "Which Guardian of the Galaxy most resembles a 'trash bandit'", "answer": "Rocket", "asked": false },
      { "question": "What artificial intelligence did Tony Stark create only to have turn against him", "answer": "Ultron", "asked": false },
      { "question": "Which unstoppable supervillain is not actually a mutant", "answer": "Juggernaut", "asked": false },
      { "question": "Which of the Defenders has nearly indestructable skin", "answer": "Luke Cage", "asked": false },
      { "question": "Which X-Men member drains the powers of others by physical contact", "answer": "Rogue", "asked": false },
      { "question": "Who is the Dark Avenger Hawkeye", "answer": "Bullseye", "asked": false },
      { "question": "Whose catchprase was, 'Excelsior!' (hint: the immortal...", "answer": "Stan Lee", "asked": false },
      { "question": "What nefarious villain rules The Savage Lands", "answer": "Mr. Sinister", "asked": false },
      { "question": "Which symbiote calls Venom his progenitor", "answer": "Carnage", "asked": false },
      { "question": "Who invented a suit powered by 'Pym' particles to change size", "answer": "Ant-Man", "asked": false },
      { "question": "Who eventually married Tony Stark", "answer": "Pepper Potts", "asked": false },
      { "question": "Who does Eddie Brock blame for all of his percieved misfortunes", "answer": "Peter Parker", "asked": false },
      { "question": "Who said, 'With great power comes great responsibility'", "answer": "Ben Parker", "asked": false },
      { "question": "Which villain of H.Y.D.R.A. was horribly disfigured in an attempt to create a super-soldier serum", "answer": "Red Skull", "asked": false },
      { "question": "Who helped Professor Xavier create Cerebro", "answer": "Magneto", "asked": false },
      { "question": "Which time-traveler is related to Cyclops", "answer": "Cable", "asked": false },
      { "question": "How many Infinity Stones are there in existence (#)", "answer": "5", "asked": false },
      { "question": "Who does Thanos hope to appease by collecting all of the Infinity Stones to wipe out half the life in the universe", "answer": "Death", "asked": false },
      /*Original code is changed to allow random questions to be asked through the array. In addition, the correct answer is supplied whenever a wrong answer is given. The questions are from the Marvel Comics Universe, because, well DCU just sucks. The play(quiz) function is adapted to suit the programming choices incorporated by the new format of the quiz game. Arrangement of functions and nesting of code is a product of trial and error to achieve the desired functionality of the program and deviates from the original programmers design cited below.*/
    ]
  }; // end quiz

}());
/* Code adapted from tutorial exercises found in:
JavaScript: Novice to Ninja
by Darren Jones
Copyright © 2014 SitePoint Pty. Ltd
Published by SitePoint Pty. Ltd.
48 Cambridge Street Collingwood
VIC Australia 3066
Web: www.sitepoint.com
Email: business@sitepoint.com
ISBN 978-0-9924612-2-5 (print)
ISBN 978-0-9924612-1-8 (ebook)
*/
