var number1;
var number2;
var enteredAnswer;
var answer;
var lastAnswerPlace=0;
var lastAnswer=0;
function problem(){
	do {
		number1 = Math.round( Math.random() * 20 );
		number2 = Math.round( Math.random() * 20 );
		answer = (number1 + number2);
	} while (answer == lastAnswer);
	document.getElementById("prompt").innerHTML = "" + number1 + " + " +     number2 + " :";
	lastAnswer = answer;
	fillButtons();
	placeCorrectAnswer();
}
function incorrect(id) {
	lastAnswerPlace = parseInt(id.replace('answerOption',''));
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
			el.innerHTML=Math.floor( 1 + Math.random() * 40 ); 
		} while (parseInt(el.innerHTML) == answer);
		el.onclick  = function() {  incorrect(this.id); };
	})
}
function placeCorrectAnswer(){
	var randomNum=0;
	do {
		randomNum = Math.floor( 1 + Math.random() * 4 );
	} while (randomNum == lastAnswerPlace);
	lastAnswerPlace = randomNum;
	var el = document.getElementById("answerOption"+randomNum);
	el.innerHTML=answer; 
	el.onclick  = function() {  correct(); };
}
