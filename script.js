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
