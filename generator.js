/*
When working locally (file://), calling toDataURL on a canvas element will throw an security error.
	it will also throw it if using images from another site. if image is hosted on github only, it will work.
	to fix it locally,

		for firefox: got to about:config and set privacy.file_unique_origin to false
		for chrome: add the flag --allow-file-access-from-files
		source: https://dev.to/dengel29/loading-local-files-in-firefox-and-chrome-m9f
*/



var templateNum = 0;
var numOfTemplates = 0;

function generateMeme(img, topText, topSize, bottomText){
	let fontSize;
	canvas.width = img.width;
	canvas.height = img.height;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0);

	if(topSize == 0) {
		return;
	}

	fontSize = canvas.width * topSize;
	ctx.font = fontSize + 'px Impact';
	ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	ctx.textAlign = 'center';
	ctx.lineWidth = fontSize / 20;


	//creates array of text seperated by newline
	ctx.textBaseline = 'top';
	topText.split('\n').forEach(function(text,index){
		ctx.fillText(text, canvas.width / 2, index * fontSize , canvas.width); 		
		ctx.strokeText(text, canvas.width / 2, index * fontSize , canvas.width);		
	});

	
	ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (text, index) { 
        ctx.fillText(text, canvas.width / 2, canvas.height - index * fontSize, canvas.width);
        ctx.strokeText(text, canvas.width / 2, canvas.height - index * fontSize, canvas.width);
    });

}


function make_meme(){
	var topText = document.getElementById("toptext");
	var topSize = document.getElementById("topsize");
	var bottomText = document.getElementById('bottomtext');
	var bottomSize = document.getElementById("bottomsize");
	var image = document.getElementById('image');
	var generateButton = document.getElementById('generateButton');
	var canvas = document.getElementById('canvas');
	// var downloadButton = document.getElementById('downloadbutton');

	ctx = canvas.getContext('2d');		//creates object that provides methods for drawing

	canvas.width = 0;
	canvas.height = 0;

	//generate meme button
	generateButton.addEventListener('click', function(){

		let reader = new FileReader();						
		//using uploaded image
		reader.onload = function(){
			let img = new Image;
			img.src = reader.result;
			generateMeme(img, topText.value, topSize.value, bottomText.value);
			templateNum = 0;
		};
		
		if(templateNum == 0) {
			reader.readAsDataURL(image.files[0]);
		}

		//using template
		if(templateNum != 0) {
			templates = document.querySelectorAll(".hiddenTemplate");
			generateMeme(templates[templateNum-1], topText.value, topSize.value, bottomText.value);
		}

	});

}

//function called when download button is clicked

download_img = function(download) {			
	var image = canvas.toDataURL("image/png");
	download.href = image;
}


function showTemplates() {

	let randomButton = document.getElementById('randomButton');

	if(randomButton.style.display == 'inline') {
		randomButton.style.display = 'none';
	}

	else {
		randomButton.style.display = 'inline';
	}

	var templates = document.querySelectorAll(".hiddenTemplate");

	for(var i = 0; i < templates.length; i++) {
		if(templates[i].style.display == 'inline') {
			templates[i].style.display = 'none';
		}

		else {
			templates[i].style.display = 'inline';
		}
	}

}

function useTemplate() {
	var templates = document.querySelectorAll(".hiddenTemplate").forEach(template => {
		numOfTemplates++;
		template.addEventListener('click', event => {
			generateMeme(template, "", 0, "");
			templateNum = template.getAttribute('id');
			document.getElementById('image').value = "";	//remove uploaded image
			showTemplates();
		})
	})
}

function getRandomTemplate() {
	let randomTemplateNum = Math.floor(Math.random()*numOfTemplates + 1);
	console.log(randomTemplateNum);
	let template = document.getElementById(randomTemplateNum).click();
}

function resetTemplateNum() {
	this.templateNum = 0;
}

useTemplate();
make_meme();




