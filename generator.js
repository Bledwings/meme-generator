
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
	
	ctx.textBaseline = 'top';
	topText.split('\n').forEach(function(t,i){
		ctx.fillText(t, canvas.width / 2, i * fontSize , canvas.width); 		//where to draw text
		ctx.strokeText(t, canvas.width / 2, i * fontSize , canvas.width);		//outlines for text
	});

	
	ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) { 
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });

}


function make_meme(){
	var topText = document.getElementById("toptext");
	var topSize = document.getElementById("topsize");
	var bottomText = document.getElementById('bottomtext');
	var bottomSize = document.getElementById("bottomsize");
	var image = document.getElementById('image');
	var generateButton = document.getElementById('generate');
	var canvas = document.getElementById('canvas');
	var downloadButton = document.getElementById('downloadbutton');

	ctx = canvas.getContext('2d');		//creates object that provides methods for drawing

	canvas.width = 0;
	canvas.height = 0;


	generate meme button
	generateButton.addEventListener('click', function(){
		let reader = new FileReader();
		reader.onload = function(){
			let img = new Image;
			img.src = reader.result;
			generateMeme(img, topText.value, topSize.value, bottomText.value);
		};
		reader.readAsDataURL(image.files[0]);
	});

}

makeMeme = function(generate) {
	generate.href = make_meme();

}

//function called when download button is clicked
download_img = function(download) {					
	var image = canvas.toDataURL("image/jpg");
	download.href = image;

}

//so page doesnt have blank space for meme before generation
canvas.width = 0;
canvas.height = 0;


