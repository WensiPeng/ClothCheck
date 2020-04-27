$(function(){
	$(".card-image-top").hover(function(){
		$(this).parent().children(".add-button").addClass("showAddButton");
	}, function(){
		$(this).parent().children(".add-button").removeClass("showAddButton");
	})
})