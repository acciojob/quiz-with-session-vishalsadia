//your JS code here.
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const scoreContainer = document.getElementById('score');

const questions = [
  {
    question: "What is the capital of France?",
    answers: {
      a: "Paris",
      b: "Madrid",
      c: "Rome"
    },
    correctAnswer: "a"
  },
  {
    question: "What is 2 + 2?",
    answers: {
      a: "3",
      b: "4",
      c: "5"
    },
    correctAnswer: "b"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: {
      a: "Shakespeare",
      b: "Chaucer",
      c: "Hemingway"
    },
    correctAnswer: "a"
  }
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (const letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    output.push(
      `<div class="question">${currentQuestion.question}</div>
      <div class="answers">${answers.join('')}</div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');
  let numCorrect = 0;

  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
    }
  });

  scoreContainer.innerHTML = `Your score is ${numCorrect} out of ${questions.length}.`;

  // Store score in local storage
  localStorage.setItem('score', numCorrect);
}

function loadProgress() {
  questions.forEach((currentQuestion, questionNumber) => {
    const selector = `input[name=question${questionNumber}][value=${sessionStorage.getItem(`question${questionNumber}`)}]`;
    const selectedInput = quizContainer.querySelector(selector);
    if (selectedInput) {
      selectedInput.checked = true;
    }
  });
}

buildQuiz();

submitButton.addEventListener('click', () => {
  showResults();
});

// Load progress from session storage
loadProgress();

// Save progress to session storage when an option is selected
quizContainer.addEventListener('change', (e) => {
  if (e.target.matches('input[type=radio]')) {
    const questionNumber = e.target.name.slice(-1);
    const selectedValue = e.target.value;
    sessionStorage.setItem(`question${questionNumber}`, selectedValue);
  }
});


// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();
