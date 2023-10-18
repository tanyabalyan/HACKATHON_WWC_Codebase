function validateAns(ans) {
  //alert("here");
  var isCorrect = ans.getAttribute("data-correctans");
  //    alert(isCorrect);
  if (isCorrect == "false") {
    ans.style.backgroundColor = "red";
  }
}
