let questions = '';
let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("nextButton");

function loadQuestion() {
  const uri = window.location.search.replace("?", "");
  const category_id = (uri.split('&')[0]).split('=')[1];
  const no = (uri.split('&')[1]).split('=')[1];
  $('#category').val(category_id);
  $('#currentNo').val(no);

  $.ajax({
    type: "GET", 
    url: "app/question.php", 
    data: uri, 
    success: function (response) { //console.log(response);
        if (response !== '')
        {
          questions = JSON.parse(response);
          const q = questions[currentQuestion];
          $('.quiz').html(q.category);
          questionElement.textContent = q.question;
          choicesElement.innerHTML = "";
          for (let i = 0; i < q.choices.length; i++) {
            const choice = document.createElement("button");
            choice.textContent = q.choices[i];
            choice.addEventListener("click", () => checkAnswer(i));
            choicesElement.appendChild(choice);
          }
        }
        else 
        {     
          $("#nextButton").html('Check Your Score');
        }
    },
  });
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
  const category_id = $('#category').val();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    $.ajax({
      type: "POST", 
      url: "app/save_score.php", 
      data: "cat=" + category_id + "&score=" + score, 
      success: function (response) {
        questionElement.textContent = `Quiz completed. You got ${score} out of ${questions.length} questions correct.`;
        choicesElement.innerHTML = "";
      },
    });
    
  }
}

function chooseCategory(cat) {
  location.href = "recycle-quiz.html?cat=" + cat + "&no=1";
}

// Add a click event listener to the "Next" button
nextButton.addEventListener("click", continueQuiz);

loadQuestion();
