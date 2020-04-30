
var reader = new FileReader();

reader.onload = function(event) {
	var canvas = $("canvas");
	var context = canvas.get(0).getContext("2d");
	var imageURL = event.target.result;

	var img = new Image();

	//wait until the image has been fully loaded
	img.onload = function(){
		context.canvas.height = img.height;
        context.canvas.width  = img.width;
		context.drawImage(img, 0, 0);
		var cropper = new Cropper(canvas[0], {
			aspectRatio: 9 / 16
		})
		//show crop and restore button
		$(".crop-button, .restore-button").addClass("show-button");
		//show canvas
		$(".canvas-div").addClass("show-display");
		//crop image
		$(".crop-button").on("click", function(){
			var croppedImageDataURL = cropper.getCroppedCanvas().toDataURL("image/*");
			$(".image-display").empty();
			$(".image-display").addClass("show-display");
			$(".image-display").append($('<img>').attr('src', croppedImageDataURL));
			//add the selected image to response
			$('.image').attr("value", croppedImageDataURL);
		})
		//restore image
		$(".restore-button").on("click", function(){
			cropper.reset();
			$(".image-display").removeClass("show-display");
			$(".image-display").empty();
			//clear the selected image to response
			$('.image').attr("value", "");
		})

	}
	img.src = imageURL;

}
reader.error = function(event){
	console.log("Cannot read file");
}

$(function(){
	var oldImageURL = $('.image').attr("value");
	//on edit page, show old image when the page is loaded
	if(oldImageURL !== ""){
			//show canvas
			$(".image-display").addClass("show-display");
			$(".image-display").append($('<img>').attr('src', oldImageURL));
		}
	$(".image-file").on("change", function(event){
		// when #image-file is changed, new file is uploaded
		var file = event.target.files[0];
		reader.readAsDataURL(file);
	})
})

