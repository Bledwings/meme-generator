
function generateMeme(img, topText, topSize, bottomText){
	let fontSize;
	canvas.width = img.width;
	canvas.height = img.height;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0);

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
	var generateButton = document.getElementById('button');
	var canvas = document.getElementById('canvas');
	var downloadButton = document.getElementById('downloadbutton');

	ctx = canvas.getContext('2d');		//creates object that provides methods for drawing

	canvas.width = 0;
	canvas.height = 0;


	//generate meme button
	generateButton.addEventListener('click', function(){
		let reader = new FileReader();						//reader stores input file
		reader.onload = function(){
			let img = new Image;
			img.src = reader.result;
			generateMeme(img, topText.value, topSize.value, bottomText.value);
		};
		reader.readAsDataURL(image.files[0]);
	});

}

//function called when download button is clicked
download_img = function(download) {					
	var image = canvas.toDataURL("image/jpg");
	download.href = image;

}

// function showTemplates() {
// 	var generateTemplate = document.getElementById("hidden1");

// 		if(generateTemplate.style.display === 'block') {
// 			generateTemplate.style.display = 'none';
// 		}

// 		else {
// 			generateTemplate.style.display = 'block'
// 		}
// }

function showTemplates() {
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

make_meme();




