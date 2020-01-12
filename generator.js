let topText,topSize, bottomText, bottomSize, image, button, canvas, ctx;

function generateMeme(img, topText, topSize, bottomText, bottomSize){
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
	button = document.getElementById('button');
	canvas = document.getElementById('canvas');

	ctx = canvas.getContext('2d');

	canvas.width = 0;
	canvas.height = 0;

	button.addEventListener('click', function(){
		let reader = new FileReader();
		reader.onload = function(){
			let img = new Image;
			img.src = reader.result;
			generateMeme(img, topText.value, topSize.value, bottomText.value, bottomSize.value);
		};
		reader.readAsDataURL(image.files[0]);
	});
}

make_meme();
