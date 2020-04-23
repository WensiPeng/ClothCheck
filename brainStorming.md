Goal: keep track of clothes that I own.

Features: 
	view all my clothes,
	add items,
	edit items,
	delete items,

Advance features:
	log what I wear today,
	view by categories,
	rate each piece of cloth,
	rank most wear,
	outfit of the day

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
	  UI improvements

Sidenotes:
	use Standard,
	avoid callback hell: https://www.freecodecamp.org/news/how-to-deal-with-nested-callbacks-and-avoid-callback-hell-1bc8dc4a2012/




