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

  //e.preventDefault();

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

function callBackFn(response) {
  var id = response["id"];
	var imageName = response["imageName"];
	var imageURL = response["imageURL"];
	console.log(id + " " + imageName + " " + imageURL);

  console.log(response);

  //document.write(response);

  //$("#project" + id + " .details").html(projectHTML);
  //$(".square #"+id).remove();
  location.reload();
}

function removeItem(e){

  //e.preventDefault();

  console.log("removeItem()");

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('remove'.length);

  console.log("id = " + idNumber)

  $.get(url+"/removePersonal/"+idNumber, removeCallback);
}

function removeCallback(response) {
  var id = response["id"];
	var imageName = response["imageName"];
	var imageURL = response["imageURL"];
	console.log(id + " " + imageName + " " + imageURL);

  //$("#project" + id + " .details").html(projectHTML);
  $(".square #"+id).remove();
  location.reload();
}


// Add event listener to remove button
const container = document.querySelector(".container");
const add = document.querySelector(".add");
const cancel = document.querySelector(".CancelButton");
const ok = document.querySelector(".OkButton");
