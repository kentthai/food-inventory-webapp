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
  $('.move_a').click(moveItem_a);
  $('.move_b').click(moveItem_b);

  $('.remove_a').click(removeItem_a);
  $('.remove_b').click(removeItem_b);


	// Feature detects Navigation Timing API support.
	if (window.performance) {
	  // Gets the number of milliseconds since page load
	  // (and rounds the result since the value must be an integer).
	  var timeSincePageLoad = Math.round(performance.now());

	  // Sends the timing hit to Google Analytics.
		$('.move_a').click(function() {
			ga('send', 'event', 'move_a', 'click');
			ga('send', 'timing', 'move_a', 'click', timeSincePageLoad);
		});

		$('.move_b').click(function() {
			ga('send', 'event', 'move_b', 'click');
			ga('send', 'timing', 'move_b', 'click', timeSincePageLoad);
		});

		$('.remove_a').click(function() {
			ga('send', 'event', 'remove_a', 'click');
			ga('send', 'timing', 'remove_a', 'click', timeSincePageLoad);
		});

		$('.remove_b').click(function() {
			ga('send', 'event', 'remove_b', 'click');
			ga('send', 'timing', 'remove_b', 'click', timeSincePageLoad);
		});
	}
}

function moveItem_a(e){

  //e.stopPropagation();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move_a').attr('id');
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

function moveItem_b(e){

  //e.stopPropagation();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move_b').attr('id');
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

function removeItem_a(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove_a').attr('id');
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

function removeItem_b(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove_b').attr('id');
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
