// hover effect on image: show plus icon
$(function(){
	$(".card-image-top, .add-button").hover(function(){
		$(this).parent().children(".add-button").addClass("showAddButton");
		$(this).parent().children("img").css("opacity","0.4");
	}, function(){
		$(this).parent().children(".add-button").removeClass("showAddButton");
		$(this).parent().children("img").css("opacity","1.0");
	})
})

//add item to outfit when click on image or add button
$(function(){
	var itemId;
	var itemIdArray = [];
	var itemName;
	var itemNameArray = [];
	$(".card-image-top, .add-button").on("click", function(){
		itemId = ($(this).parent().parent().attr("itemId"));
		itemName = ($(this).parent().parent().attr("itemName"));
		if(!itemIdArray.includes(itemId)){
			itemIdArray.push(itemId);	
			itemNameArray.push(itemName);
			$("#selected-items").append(`<div class="wrapper" id=${itemId}>
				<span>${itemName}</span>
				<i class="fas fa-trash-alt delete-button"></i>
				</div>`);
		}
		$("#selected-items input").attr('value', itemIdArray);
		addDeleteEffect();
	})
	//delete item to outfit when click on tag or delete button
	$(document).on("click",".wrapper", function(){
		itemId = ($(this).attr("id"));
		var idIndex = itemIdArray.indexOf(itemId);
		if(idIndex > -1){
			itemIdArray.splice(idIndex, 1);
			itemNameArray.splice(idIndex, 1);
		}
		$("#"+ itemId).remove();
		$("#selected-items input").attr('value', itemIdArray);
	})
})


//hover effect on item tag
function addDeleteEffect(){
	$(".wrapper").hover(function(){
		$(this).children("i").addClass("showDeleteButton");
		$(this).css("opacity","0.4");
	}, function(){
		$(this).children("i").removeClass("showDeleteButton");
		$(this).css("opacity","1.0");
	})
}
