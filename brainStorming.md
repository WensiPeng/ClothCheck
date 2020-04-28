Goal: keep track of clothes that I own.

Features: 
	X view all my clothes,
	X add items,
	X edit items,
	X delete items,

Advance features:
	X log what I wear today,
	X view by categories,
	X rate each piece of cloth,
	rank most wear,
	X outfit of the day

Each item contains information of:
	image,
	name,
	color,
	description,
	purchased time,
	category,
	price,
	brand,
	worn times,
	rating,
	season

root page (landing page): /
display all items: /allItems
display outfit of the day: /ootd
display one item: /allItems/itemId
display items in ootd: /ootd/itemId

RESTful:

Name 	Path 				HTTP Verb	Purpose
Index	/allItems			GET			show all items
New		/allItems/new  	    GET         show new item form
Create	/allItems			POST        create a new item
Show	/allItems/:id       GET         show info of one specific item
Edit 	/allItems/:id/edit  GET         show edit form of an item 
Update	/allItems/:id 		PUT         update a particular item
Destroy	/allItems/:id 		DELETE      delete a particular item


Workflow:
	X create some test items
	X create skeleton: RESTful routes
	X add mongoose database
	X add simple styling
	X data association: associate everything with one user
	X authentication
	  features:
	  	X filter
	  	X sorting
	  	pagination
	  out fit of the day
	  add weather plug in
	  outfit generater?	
	  UI improvements

Outfit of the Day
Name 	Path 						HTTP Verb	Purpose
Index	/outfit-of-the-day			GET			show all outfits
New		/outfit-of-the-day/new  	GET         show new outfit form
Create	/outfit-of-the-day			POST        create a new outfit
Show	/outfit-of-the-day/:id      GET         show info of one outfit
Edit 	/outfit-of-the-day/:id/edit GET         show edit form of an outfit
Update	/outfit-of-the-day/:id 		PUT         update a outfit
Destroy	/outfit-of-the-day/:id 		DELETE      delete a outfit

New outfit of the day:
	X Date picker
	  A search field to search item
	X A section show all items
	X Filter and sort feature
	X Click on items to add to outfit
	X Click to remove items from outfit
	 Add to wornTimes
	 Add to woreDate

More advanced features:
	Add weather forecast for the day
	Add tags to image

Sidenotes:
	use Standard,
	avoid callback hell: https://www.freecodecamp.org/news/how-to-deal-with-nested-callbacks-and-avoid-callback-hell-1bc8dc4a2012/




