$(function(){
	$('.stars-input span').on("click", changeStarColor)
})

function changeStarColor(){
	var onStar = parseInt($(this).data('value'), 10);
	var stars = $(this).parent().children('span.fa-star');
	for(var i=0; i < stars.length; i++){
		$(stars[i]).removeClass('selected');
	}
	for(var i = 0; i < onStar; i++){
		$(stars[i]).addClass('selected');
	}

	$('.rating')[0].value = onStar;
}

//show star rating at show and edit page
$(function(){
	$('.stars-output span').each(function(e){
		var stars = $(this).parent().children('span.fa-star');
		if(e < $('.rating')[0].value){
			$(this).addClass("selected");
		}else{
			$(this).removeClass("selected");
		}
	})
})
$(function(){
	$('.stars-edit span').each(function(e){
		var stars = $(this).parent().children('span.fa-star');
		if(e < $('.rating')[0].value){
			$(this).addClass("selected");
		}else{
			$(this).removeClass("selected");
		}
	})
})

$(function(){
	$('.stars-edit span').on("click", changeStarColor)
})

