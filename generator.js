let topText, bottomText, image, button, canvas, ctx;

function generateMeme(img, topText, bottomText){
	canvas.width = img.width;
	canvas.height = img.height;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0);

	let fontSize = canvas.width / 15;
	ctx.font = fontSize + 'px Impact';
	ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	ctx.lineWidth = fontSize / 20;
	ctx.textAlign = 'center';

	ctx.textBaseline = 'top';
	ctx.fillText(topText, canvas.width / 2, 0 , canvas.width); 
	ctx.strokeText(topText, canvas.width / 2, 0 , canvas.width);


	ctx.textBaseline = 'bottom';
	ctx.fillText(bottomText, canvas.width / 2, canvas.height , canvas.width); 
	ctx.strokeText(bottomText, canvas.width / 2, canvas.height , canvas.width);

}

function make_meme(){
	topText = document.getElementById("toptext");
	bottomText = document.getElementById('bottomtext');
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
			generateMeme(img, topText.value, bottomText.value);
		};
		reader.readAsDataURL(image.files[0]);
	});
}

make_meme();
