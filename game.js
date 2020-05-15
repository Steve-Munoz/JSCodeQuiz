// // GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

var seconds = 30;

var currentQuestion = {};
var acceptingAnswers = false;
// Below is asking what question are you on?
var questionCounter = 0;
// Below is an empty array which will be a full copy of our
//.. full questions set and were going to take questions out of the available
//.. questions array as we use them so that we can always find a unique question
// ..to give the user
var availableQuestions = [];
// below is our questions array in which will be what we will ask the users for our quiz
let questions = [
  {
    question: "Where is the correct place to insert a Javascript?",
    choice1: "<body>",
    choice2: "<head>",
    choice3: "<header>",
    choice4: "both <body> and <head>",
    answer: 4,
  },
  {
    question: "How do you create a function in JavaScript?",
    choice1: "function:myFunction()",
    choice2: "function = myFunction()",
    choice3: "function myFunction()",
    choice4: "function.myFunction",
    answer: 3,
  },
  {
    question: " How do you add a comment in Javascript?",
    choice1: "// This is my comment",
    choice2: "<!-- This is my comment -->",
    choice3: "comment: This is my comment",
    choice4: "\\ This is my comment",
    answer: 1,
  },
];

// timer

var seconds_interval = setInterval(secondsTimer, 1000);

function secondsTimer() {
  seconds = seconds - 1;
  document.getElementById("seconds").innerHTML = "Timer: " + seconds;

  // Check if the seconds and minutes counter has reached 0
  // If reached 0 then end the session
  if (seconds <= 0) {
    clearInterval(seconds_interval);

    // once time is up move to highscores html page
    document.getElementById("seconds").innerHTML = "Times up!";
    window.location.assign("highscores.html");
  }
}

// end timer

// set constants
const correctBonus = 10;
const maxQuestions = 3;

startGameQuiz = () => {
  // going to use the below as a reset
  questionCounter = 0;
  score = 0;
  //below we are copying all question from the questions from the
  //.. questions array by using the spread operator "..."
  //.. which is saying take this array and spread out each of its items and put
  // .. them into a new array
  availableQuestions = [...questions];

  getNewQuestion();
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    //go to the end page
    return window.location.assign("end.html");
  }
  // below we are incrementing so that we get a new question to pop up
  // .. once a question is answered

  questionCounter++;
  //   below is how we randomly choose a question from our questions array
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  //   below is saying that the current question you are on
  // is being selected randomly availableQuestions[questionsIndex]
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
// accepting answer when user answers questions
choices.forEach((choice) => {
  choice.addEventListener("click", (event) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = event.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);
    // setTimeout is function built into javascript
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

// below we are calling the function which is a full copy of the questions array
startGameQuiz();
