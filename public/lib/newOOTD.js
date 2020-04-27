$(function(){
	$(".card-image-top").hover(function(){
		$(this).parent().children(".add-button").addClass("showAddButton");
		$(this).parent().children("img").css("opacity","0.4");
	}, function(){
		$(this).parent().children(".add-button").removeClass("showAddButton");
		$(this).parent().children("img").css("opacity","1.0");
	})
	$(".add-button").hover(function(){
		$(this).parent().children(".add-button").addClass("showAddButton");
		$(this).parent().children("img").css("opacity","0.4");
	}, function(){
		$(this).parent().children(".add-button").removeClass("showAddButton");
		$(this).parent().children("img").css("opacity","1.0");
	})
})