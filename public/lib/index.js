// <!--  filter items by category and season -->
// <!-- season filter & category filter -->
// <!-- Within season filter or category filter, creterias are combined using OR logic. Between season filter and category filter, creterias are combined using AND logic. -->
	$(function(){
		$('#all').click(function(){
			$('.filter-items').show();
		})
		var $filterCheckboxes = $('input[type="checkbox"]');
		$filterCheckboxes.on('change', function() {
		  var selectedFilters = {};
		  $filterCheckboxes.filter(':checked').each(function() {
		    if (!selectedFilters.hasOwnProperty(this.name)) {
		      selectedFilters[this.name] = [];
		    }
		    selectedFilters[this.name].push(this.value);
		  });

		  // create a collection containing all of the filterable elements
		  var $filteredResults = $('.filter-items');

		  // loop over the selected filter name -> (array) values pairs
		  $.each(selectedFilters, function(name, filterValues) {
		    // filter each .filter-items element
		    $filteredResults = $filteredResults.filter(function() {
		      var matched = false,
		        currentFilterValues = $(this).data('category').split(' ');
		      // loop over each category value in the current .flower's data-category
		      $.each(currentFilterValues, function(_, currentFilterValue) {
		        // if the current category exists in the selected filters array
		        // set matched to true, and stop looping. as we're ORing in each
		        // set of filters, we only need to match once
		        if ($.inArray(currentFilterValue, filterValues) != -1) {
		          matched = true;
		          return false;
		        }
		      });
		      // if matched is true the current .filter-items element is returned
		      return matched;
		    });
		  });

		  $('.filter-items').hide().filter($filteredResults).show();
		});
	})	
	
	//sort item by price 
	$(function(){
		var itemsToSort = $(".filter-items");
		$("#priceAscd").click(function(){
			itemsToSort.sort(function(a, b){
			a = parseInt($(a).attr("price"), 10);
			b = parseInt($(b).attr("price"), 10);
			console.log("a: " + a);
			console.log("b: " + b);
			//sort from lower price to higher price
			return a - b;
			}).appendTo("#sort-items");

		})
		$("#priceDscd").click(function()
			{itemsToSort.sort(function(a, b){
				a = parseInt($(a).attr("price"), 10);
				b = parseInt($(b).attr("price"), 10);
				//sort from lower price to higher price
				return b - a
			})
		})
	})
	