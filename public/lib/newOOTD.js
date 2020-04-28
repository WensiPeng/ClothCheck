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

var itemIdArray = [];
var itemNameArray = [];
//load item tags 
$(function(){
	//find name and _id from the string of objects
	var itemsString = $("#selected-items input").attr('value');
	var itemsArray = itemsString.split("},{");
	itemsArray.forEach(function(item){
		var nameArray = item.split(",").filter(function(ele){
			return ele.includes(" name: ");
		})
		var idArray = item.split(",").filter(function(ele){
			return ele.includes("_id: ");
		})
		var name = nameArray[0].split(": ")[1].split("'")[1];
		var id = idArray[0].split(": ")[1];

		//append name and id to arrays
		itemIdArray.push(id);
		itemNameArray.push(name);

		//show tags
		$("#selected-items").append(`
		<div class="wrapper" id=${id}>
			<span>${name}</span>
			<i class="fas fa-trash-alt delete-button"></i>
		</div>`);	
		})
	//set item attribute value
	$("#selected-items input").attr('value', itemIdArray);
	addDeleteEffect();
})

$(function(){
	var itemId;
	var itemName;
	//add item to outfit when click on image or add button
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


