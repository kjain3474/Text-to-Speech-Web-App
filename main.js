window.addEventListener('load', function() {

console.log("Ready");

const worker = new Tesseract.TesseractWorker();


var startbutton = document.getElementById('start');
var camera = document.getElementById('camera');
var token = document.getElementById('token');



startbutton.onclick = function() {
	startbutton.style.display = "none";
	textToSpeech("Welcome to the vodafone idea sim activation kiosk, I am going to guide you to get you a new simcard, Lets start by verifying your aadhar card details","p1");
}


camera.onclick = function() {
	hideUploadUI();
	document.getElementById('uploadfile').click();
}

token.onclick = function() {
	document.getElementById('result').style.display = "none"; 
	document.getElementById('aadharnumber').style.display = "none";
	document.getElementById('showtoken').style.display = "block";
	textToSpeech('Please show this token at any Vodafone Idea Centre to collect your simcard, Thank you have a nice day!','p4');
}


function textToSpeech(text,phase) {

	// this will hold an english voice
	var english_voice = '';

	// find voice by language locale "en-US"
	// if not then select the first voice
	for(var i=0; i<available_voices.length; i++) {
		if(available_voices[i].lang === "hi-IN" ){
			english_voice = available_voices[i];
			break;
		}
	}
	if(english_voice === '')
		english_voice = available_voices[0];

	// new SpeechSynthesisUtterance object
	var utter = new SpeechSynthesisUtterance();
	utter.rate = 1;
	utter.pitch = 0.7;
	utter.text = text;
	utter.voice = english_voice;

	// event after text has been spoken
	utter.onend = function() {
		stopTalking();
		if(phase == "p1")
		{

			showAadharUI();
		}
	}

	// speak
	window.speechSynthesis.speak(utter);

	setTimeout(	startTalking()	, 150);
}


function showAadharUI(){

	document.getElementById("aadharUI").style.display = "block";

}

function hideUploadUI(){

	document.getElementById("uploadStage").style.display = "none";

}


function startTalking(){

	document.getElementById("guide").style.display = "none";
	document.getElementById("guide").style.backgroundImage = "url('women.gif')";
	document.getElementById("guide").style.display = "block";
}



function stopTalking(){

	document.getElementById("guide").style.display = "none";
	document.getElementById("guide").style.backgroundImage = "url('women.png')";
	document.getElementById("guide").style.display = "block";
}

var name ;
function writeResult(text){

	document.getElementById('loader').style.display="none";

	var regexN = (/[A-Z]([a-z]{2,})(?:\s+[A-Z]([a-z]{2,}))(?:\s+[A-Z]([a-z]{2,}))/);

	var regexA = /(\d{4}[- ]){3}/

	name = text.match(regexN)

	var number = text.match(regexA);

	document.getElementById('result').innerHTML = 'Hello ' + '<span style="font-size:1.5em;">Mr. ' + name[0] + '</span>' + ', Your aadhar number is:'

	document.getElementById('aadharnumber').innerHTML =  number[0];

	document.getElementById('tokenStage').style.display="block"
 
	textToSpeech('Thank you, Mr.' + name[0]+', for choosing vodafone idea connection, please press the button to confirm your details and generate token','p3');
 
}


var input = document.querySelector('input[type=file]'); // see Example 4

input.onchange = function () {

  document.getElementById('camera').style.display="none";

  document.getElementById('loader').style.display="block";

  var file = input.files[0];

  
  textToSpeech('Please wait for sometime, as it may take a few minutes to process your data','p2');
  
	worker.recognize(file)
  .progress(message => 
	console.log(message))
  .then(result => writeResult(result.text)
  	)

};


})