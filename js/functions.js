$(document).ready(function () {
  const uri = window.location.search.replace("?", "");
  const category_id = (uri.split('&')[0]).split('=')[1];
  const no = (uri.split('&')[1]).split('=')[1];
  $('#category').val(category_id);
  $('#currentNo').val(no);

  $.ajax({
    type: "GET", 
    url: "app/question.php", 
    data: uri, 
    success: function (response) {
        if (response !== '')
        {
          const str = JSON.parse(response);
          const incorrectResponse = (str.incorrectResponse).replace(/'/g, "\\'");
          $(".question").html(str.question);
          $.each(str.options, function (i, item) { 
            $('.answer').append('<button class="ans" data-correctans="' + item.is_correct + '" onclick="validateAns(this, \'' + incorrectResponse + '\');">' + item.answer + '</button>');
          });
        }
        else 
        {
          $(".question").html('Your score is: ');
          $("#next-btn").html('Check Your Score');
        }
    },
  });
});

function validateAns(ans, incorrectResponse) { 
  var isCorrect = ans.getAttribute("data-correctans");
  var score = $('#score').val();

  if (isCorrect === '0') {
    ans.style.backgroundColor = "red";
    $('.explanation').html(incorrectResponse);
  } else {
    score = parseInt(score) + 1;
    $('#score').val(score);
    $('.explanation').html('Correct!!!');
  }

}

function chooseCategory(cat) {
  location.href = "main.html?cat=" + cat + "&no=1";
}

function getNext() {
  const cat = $('#category').val();
  let currentNo = $('#currentNo').val();
  currentNo = parseInt(currentNo) + 1;
  $('#currentNo').val(currentNo);
  if ($('#next-btn').html() === 'NEXT')
  {
    location.href = "main.html?cat=" + cat + "&no=" + currentNo;
  }
  else
  {
    location.href = "scoreCard.html";
  }
  
}