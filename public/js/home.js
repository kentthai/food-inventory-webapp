'use strict';

//const url = "https://a8-fud.herokuapp.com";
//const url = "http://localhost:3000";

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.move').click(moveItem);

  $('.remove').click(removeItem);


	// Feature detects Navigation Timing API support.
	if (window.performance) {
	  // Gets the number of milliseconds since page load
	  // (and rounds the result since the value must be an integer).
	  var timeSincePageLoad = Math.round(performance.now());

	  // Sends the timing hit to Google Analytics.
		$('.move').click(function() {
			ga('send', 'event', 'move', 'click');
			ga('send', 'timing', 'move', 'click', timeSincePageLoad);
		});

		$('.remove').click(function() {
			ga('send', 'event', 'remove', 'click');
			ga('send', 'timing', 'remove', 'click', timeSincePageLoad);
		});
	}
}

function moveItem(e){

  //e.stopPropagation();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('food'.length);

  console.log("id = " + idNumber)

  //$.get(url+"/share/"+idNumber, callBackFn);
  //$.get("/share/"+idNumber, callBackFn);
  $.post("/share", {"food_id": idNumber}).done(function(response) {
    location.reload();
  }).fail(function() {
    console.log("Error while moving food item")
  });
}

function removeItem(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('remove'.length);

  console.log("id = " + idNumber)

  //$.get(url+"/removePersonal/"+idNumber, removeCallback);
  $.post("/removePersonal", {"food_id": idNumber}).done(function(response) {
    location.reload();
  }).fail(function() {
    console.log("Error while deleting food item")
  });
}