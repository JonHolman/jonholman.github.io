var number1;
var number2;
var enteredAnswer;
var answer;
var lastAnswerPlace=0;
var lastAnswer=0;
var challenges = new Array();

var op = 'a';
var maxForNumber1 = 20;
var maxForNumber2 = 20;


function problem(){
	let params = (new URL(document.location)).searchParams;
	if (params.get("op")!=null) {
		op = params.get("op");
	}
	
	if (op == 'm') {
		document.title = "Multiplication";
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

		if (op == 'm') {
			answer = (number1 * number2);
		}
		else {
			answer = (number1 + number2);
		}
	} while (answer == lastAnswer &&
		(answer <= 1 &&  (Math.round( Math.random() * 1 ) == 1) ) );
	document.getElementById("prompt").innerHTML = "" + number1 + " ";
	switch(op) {
	    case 'm':
		document.getElementById("prompt").innerHTML += "x";
		break;
	    default:
		document.getElementById("prompt").innerHTML += "+";
	}
	document.getElementById("prompt").innerHTML += " " +     number2 + " :";
	lastAnswer = answer;
	fillButtons();
	placeCorrectAnswer();
}
function incorrect(id) {
	challenges.push( document.getElementById("prompt").innerHTML.replace(' :','') );
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
	var maxAnswerChoice;
	var els = document.getElementsByClassName("answerButton");
	var index = 0;
	
	if (op == 'm') {
		maxAnswerChoice = 67;
	}
	else {
		maxAnswerChoice = maxForNumber1+maxForNumber2;
	}
	
	// from https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
	var arr = []
	while(arr.length < els.length){
	    var randomnumber = Math.floor(Math.random()*maxAnswerChoice) + 1;
	    if(arr.indexOf(randomnumber) > -1 || randomnumber == answer) continue;
	    arr[arr.length] = randomnumber;
	}
	
	[].forEach.call(els, function (el) { 
		el.innerHTML=arr[index];
		if (op == 'm' && el.innerHTML > 60) {
			el.innerHTML=120;
		}
		index++;
		el.onclick  = function() {  incorrect(this.id); };
	})
}
function placeCorrectAnswer(){
	var randomNum=0;
	do {
		randomNum = Math.floor( 1 + Math.random() * 4 );
	} while (randomNum == lastAnswerPlace);
	lastAnswerPlace = randomNum;
	var el = document.getElementById( "answerOption" + randomNum );
	el.innerHTML = answer; 
	el.onclick  = function() {  correct(); };
}

// start timer code
var count=90;
var counter;
 
function startTimer()
{
  count = parseInt(document.getElementById("seconds").value);
  document.getElementById("timer").innerHTML=count + " secs";
  counter=setInterval(timer, 1000); //1000 will  run it every 1 second
  document.getElementById("timerForm").style.display = "none";
}
function timer()
{
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     document.getElementById("original").style.display = "none";
     document.getElementById("expired").style.display = "block";
	 document.getElementById("results").innerHTML += "Score: " + parseInt(document.getElementById("score").innerHTML) + "<br />";
	 document.getElementById("results").innerHTML += "Great Job!<br />";
	 document.getElementById("results").innerHTML += "<br />Practice the following: <br />";
	 challenges.forEach(function(item) {
		document.getElementById("results").innerHTML += item+"<br />";
	 });
     return;
  }
 document.getElementById("timer").innerHTML=count + " secs";
}
// end timer code
