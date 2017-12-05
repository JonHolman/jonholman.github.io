var number1;
var number2;
var enteredAnswer;
var answer;
var lastAnswerPlace=0;
var lastAnswer=0;

var op = 'a';
var maxForNumber1 = 20;
var maxForNumber2 = 20;


function problem(){
	let params = (new URL(document.location)).searchParams;
	if (params.get("op")!=null) {
		op = params.get("op");
	}
	
	if (op == 'm')
	{
		maxForNumber1 = 12;
		maxForNumber2 = 4;	
	}
	
	
	do {
		number1 = Math.round( Math.random() * maxForNumber1 );
		number2 = Math.round( Math.random() * maxForNumber2 );
		
		if (op == 'm')
		{
			// start temporary code
			if (number2 == 3)
				number2 = 10;
			if (number2 == 4)
				number2 = 5;
			// end temporary code
		}
		
		//randomly flip the numbers
		if (Math.round( Math.random() * 1 ) == 1)
		{
			temp = number2;
			number2 = number1;
			number1 = temp;
		}

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
			if (op == 'm')
			{
			el.innerHTML=Math.floor( 1 + Math.random() * 67 ); 
			if (el.innerHTML > 60)
				el.innerHTML=120;
			}
			else {
				el.innerHTML=Math.floor( 1 + Math.random() * 40 ); 
			}
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
