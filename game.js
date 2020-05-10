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
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

//CONSTANTS
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
