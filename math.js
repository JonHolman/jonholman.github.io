var op;
var maxValOfChoices;
var number1;
var number2;
var enteredAnswer;
var answer;
var lastRandomNum=0;
var lastAnswer=0;

function problem(operation, max){
	op = operation;
  maxValOfChoices = max;
  do {
		number1 = Math.round( Math.random() * maxValOfChoices );
		number2 = Math.round( Math.random() * maxValOfChoices );
		if (op == "+") {
      answer = (number1 + number2);
    }
	} while (answer == lastAnswer);
	document.getElementById("prompt").innerHTML = "" + number1 + " ";
  if (op == "+") {
    document.getElementById("prompt").innerHTML += "+"
    }
  document.getElementById("prompt").innerHTML += " " +     number2 + " :";
	lastAnswer = answer;
	fillButtons();
	placeCorrectAnswer();
}
function incorrect() {
	var statusDiv = document.getElementById("status");
	statusDiv.innerHTML="Please try again.";
	fillButtons();
	placeCorrectAnswer();
}
function correct() {
	var statusDiv = document.getElementById("status");
	statusDiv.innerHTML="Very good!";
	document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML)+1;
	problem();
}
function fillButtons(){
	var els = document.getElementsByClassName("answerButton");
	[].forEach.call(els, function (el) { 
		do {
      if (op == "+") {
			  el.innerHTML=Math.floor( 1 + Math.random() * (maxValOfChoices+maxValOfChoices) ); 
      }
		} while (parseInt(el.innerHTML) == answer);
		el.onclick  = function() {  incorrect(); };
	})
}
function placeCorrectAnswer(){
	var randomNum=0;
	do {
		randomNum = Math.floor( 1 + Math.random() * 4 );
	} while (randomNum == lastRandomNum);
	lastRandomNum = randomNum;
	var el = document.getElementById("answerOption"+randomNum);
	el.innerHTML=answer; 
	el.onclick  = function() {  correct(); };
}
