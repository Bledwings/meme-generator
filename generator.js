let topText,topSize, bottomText, bottomSize, image, generateButton, canvas, downloadbutton, ctx;

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
		ctx.fillText(t, canvas.width / 2, i * fontSize , canvas.width); 
		ctx.strokeText(t, canvas.width / 2, i * fontSize , canvas.width);
	});
	
	ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) { 
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });

}

function make_meme(){
	topText = document.getElementById("toptext");
	topSize = document.getElementById("topsize");
	bottomText = document.getElementById('bottomtext');
	bottomSize = document.getElementById("bottomsize");
	image = document.getElementById('image');
	generateButton = document.getElementById('button');
	canvas = document.getElementById('canvas');
	downloadButton = document.getElementById('downloadbutton');

	ctx = canvas.getContext('2d');

	canvas.width = 0;
	canvas.height = 0;


	//generate meme button
	generateButton.addEventListener('click', function(){
		let reader = new FileReader();
		reader.onload = function(){
			let img = new Image;
			img.src = reader.result;
			generateMeme(img, topText.value, topSize.value, bottomText.value);
		};
		reader.readAsDataURL(image.files[0]);
	});

	//download meme
	downloadButton.addEventListener('click', function(){
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
		window.location.href=image; 
	});

}

make_meme();
