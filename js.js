function inputNumber(number) {
  document.getElementById("inputBox").value = ""+document.getElementById("inputBox").value+number;
  document.getElementById("inputBox").focus();
}

function submit() {
  document.getElementById("inputBox").focus();
}
