const questions = [
  {
    question: "What should you do with a glass bottle when you're done with it to help the environment?",
    choices: ["A) Throw it in the river", "B) Bury it in the backyard", "C) Recycle it", "D) Keep it as a toy"],
    correct: 2,
    wrong:
      "Oops, that's not quite right. The correct answer is C) Recycle it. Recycling glass bottles helps save energy and resources. Keep learning, and you'll get it next time!",
  },
  {
    question: "Which of the following items can be recycled?",
    choices: ["A) Banana peels", "B) Glass jars", "C) Old shoes", "D) Dirty tissues"],
    correct: 1,
    wrong:
      "Nice try, but the correct answer is B) Glass jars. They can be recycled to make new glass products. Keep going, and you'll get it next time!",
  },
  {
    question: "What is the purpose of recycling paper and cardboard products?",
    choices: [
      "A) To make the recycling bin look full",
      "B) To save trees and reduce waste",
      "C) To create colorful artwork",
      "D) To use it as wrapping paper",
    ],
    correct: 1,
    wrong:
      "That's not it, but don't give up! The correct answer is B) To save trees and reduce waste. Recycling paper and cardboard helps protect our forests. Keep learning and try again!",
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("nextButton");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  choicesElement.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const choice = document.createElement("button");
    choice.textContent = q.choices[i];
    choice.addEventListener("click", () => checkAnswer(i));
    choicesElement.appendChild(choice);
  }
}

function showNextButton() {
  nextButton.style.display = "block";
}

function hideNextButton() {
  nextButton.style.display = "none";
}

function checkAnswer(choice) {
  const q = questions[currentQuestion];
  const choiceButtons = choicesElement.querySelectorAll("button");
  const resultMessage = resultElement;

  // Remove any existing styles
  choiceButtons.forEach((button) => {
    button.classList.remove("correct", "incorrect");
  });

  // Remove any existing styles from the result message
  resultMessage.classList.remove("result-correct", "result-incorrect");

  if (choice === q.correct) {
    // Apply the correct answer style to the selected choice
    choiceButtons[choice].classList.add("correct");
    // Apply the background color and border styles for correct answers
    resultMessage.style.backgroundColor = "#e7f7dd";
    resultMessage.style.border = "2px solid #60be8d";
    resultMessage.classList.add("result-correct");
    score++;
    resultMessage.textContent = "Correct! Nice job :)";
  } else {
    // Apply the correct answer style to the correct choice
    choiceButtons[q.correct].classList.add("correct");
    // Apply the incorrect answer style to the selected incorrect choice
    choiceButtons[choice].classList.add("incorrect");
    // Apply the background color and border styles for incorrect answers
    resultMessage.style.backgroundColor = "#ffe3e8";
    resultMessage.style.border = "2px solid pink";
    // Apply the incorrect result style to the result message
    resultMessage.classList.add("result-incorrect");
    resultMessage.textContent = q.wrong;
  }

  showNextButton(); // Show the "Next" button

  // Don't automatically advance to the next question
}

function continueQuiz() {
  hideNextButton(); // Hide the "Next" button
  resultElement.textContent = ""; // Clear the result message
  resultElement.style.backgroundColor = ""; // Remove the background color
  resultElement.style.border = ""; // Remove the border color

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionElement.textContent = `Quiz completed. You got ${score} out of ${questions.length} questions correct.`;
    choicesElement.innerHTML = "";
  }
}

// Add a click event listener to the "Next" button
nextButton.addEventListener("click", continueQuiz);

loadQuestion();
