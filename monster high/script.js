//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "3",
    question: "Who is dating Clawd in Monster High?",
    options: ["Frankie", "Abby", "Draculaura", "Gigi"],
    correct: "Draculaura",
  },
  {
    id: "3",
    question: "When is Draculaura given her full vampire powers?",
    options: ["On her 1600th birthday", "AWhen Lord Stoker comes to Monster High to inform Draculaura she is the queen", "When Draculaura forgives Kiyomi for haunting her", "When Elissabat is crowned at her movie premiere"],
    correct: "When Elissabat is crowned at her movie premiere",
  },
  {
    id: "3",
    question: "How many wishes are there in the name of the film?",
    options: ["7", "13", "99", "10"],
    correct: "13",
  },
  {
    id: "3",
    question: "Luna Mothews is featured in which movie??",
    options: ["Boo York, Boo York", "Haunted", "Frights camera action!", "Why Ghouls fall in love?"],
    correct: "13",
  },
  {
    id: "3",
    question: "Iris Clops have how many eyes?",
    options: ["3", "0", "5", "1"],
    correct: "1",
  },
  { 
    id: "3", 
    question: "On the plane to Scaris, Rochelle tells Frankie about her boyfriend Garrott. What special thing did Garrott make for Rochelle to show her how special she was?",
    options:["His own fashion designs for Rochelle to wear", "He wrote special letters to her","He bred a rosebush for her", "He made a journal of his feelings for her"],
    correct: "He bred a rosebush for her",
  },
  {
    id:"3",
    question: "Who is Howleen's best friend?",
    options: ["Twyla", "Clawdeen", "Clawd", "Romulus"],
    correct: "Twyla",
  },
  {
    id:"3",
    question: "What is the name of Clawdeen's cafè?",
    options:["Howling cafe","Horror hotel", "Hideout cafe", "Crescent moon" ],
    correct: "Hideout cafe",
  },
  {
    id:"3",
    question: "Which of these is not one of the werewolves",
    options:["Claudia","Howlia","Claudeen", "Claudia"],
    correct:"Howlia",
  },
  {
    id:"3",
    question:"What is Cleo De Nile's biggest pet peeve?",
    options:["Not getting what she wants","Clawdeen Wolf" ,"Other girls flirting with her boyfriend","People who refuse to obey her"],
    correct:"People who refuse to obey her",
  },

];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 20;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
   
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
