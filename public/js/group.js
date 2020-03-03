'use strict';

const url = "https://a8-fud.herokuapp.com";
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

	$('.move').click(function() {
		ga('send', 'event', 'move', 'click');
	});

	$('.remove').click(function() {
		ga('send', 'event', 'remove', 'click');
	});
}

function moveItem(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('group'.length);

  console.log("id = " + idNumber)

  $.get(url+"/claim/"+idNumber, callBackFn);
}

function callBackFn(response) {
  var id = response["id"];
	var imageName = response["imageName"];
	var imageURL = response["imageURL"];
	console.log(id + " " + imageName + " " + imageURL);

  //$("#project" + id + " .details").html(projectHTML);
  $(".square #"+id).remove();
  location.reload();
}

function removeItem(e){

  //e.preventDefault();

  console.log("removing: ");
  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('remove'.length);

  console.log("id = " + idNumber)

  $.get(url+"/removeGroup/"+idNumber, removeCallback);
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
