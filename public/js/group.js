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

	$('.move').click(function() {
		ga('send', 'event', 'move', 'click');
	});

	$('.remove').click(function() {
		ga('send', 'event', 'remove', 'click');
	});
}

function moveItem_a(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move_a').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('group'.length);

  console.log("id = " + idNumber)

  $.post("/claim", {"food_id": idNumber}).done(function(response) {
    console.log("Claim success")
    location.reload();
  }).fail(function() {
    console.log("Error while deleting food item")
  });
}

function moveItem_b(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move_b').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('group'.length);

  console.log("id = " + idNumber)

  $.post("/claim", {"food_id": idNumber}).done(function(response) {
    console.log("Claim success")
    location.reload();
  }).fail(function() {
    console.log("Error while deleting food item")
  });
}


function removeItem_a(e){

  //e.preventDefault();

  console.log("removing: ");
  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove_a').attr('id');
  // get rid of 'food' from the front of the id 'food3'

  if (itemID) {
    var idNumber = itemID.substr('remove'.length);

    console.log("id = " + idNumber)

    $.post("/removeGroup", {"food_id": idNumber}).done(function(response) {
      console.log("Remove success")
      location.reload();
    }).fail(function() {
      console.log("Error while deleting food item")
    });
  }
}

function removeItem_b(e){

  //e.preventDefault();

  console.log("removing: ");
  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.remove_b').attr('id');
  // get rid of 'food' from the front of the id 'food3'

  if (itemID) {
    var idNumber = itemID.substr('remove'.length);

    console.log("id = " + idNumber)

    $.post("/removeGroup", {"food_id": idNumber}).done(function(response) {
      console.log("Remove success")
      location.reload();
    }).fail(function() {
      console.log("Error while deleting food item")
    });
  }
}