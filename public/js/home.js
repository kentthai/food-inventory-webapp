'use strict';

const url = "https://cse170-a5.herokuapp.com";

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
}

function moveItem(e){

  //e.preventDefault();

  console.log($(this));

  // Get the div ID, e.g., "project3"
	var itemID = $(this).closest('.move').attr('id');
	// get rid of 'food' from the front of the id 'food3'
	var idNumber = itemID.substr('food'.length);

  console.log("id = " + idNumber)

  $.get(url+"/share/"+idNumber, callBackFn);
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

  console.log($(this));

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

/*
container.addEventListener('click', function(event) {

	// Don't follow the link
	event.preventDefault();

  var clickClass = event.target.getAttribute("class");
  if (clickClass != null) {
    //console.log("class = " + clickClass);

    if (clickClass.includes("remove")) {

      var targetId = event.target.id;

      if (targetId == null) {
        console.log("targetId was null: " + event.target);
        //targetId = event.target.
      } else {
        console.log("remove was found with id: " + targetId);


        var removeSquare = document.getElementById(targetId);

        console.log(removeSquare);

        removeSquare.remove();
      }
    }

    // Log the clicked element in the console
    //console.log(event.target);
  }

  event.stopPropagation();

}, false);
*/

// Reveals add form
add.addEventListener('click', function(event){
	event.preventDefault();
	var addBox = document.querySelector("#addForm");
	addBox.classList.remove("hidden");

}, false);

// Close form on cancel
cancel.addEventListener('click', function(event){
	event.preventDefault();
	var addBox = document.querySelector("#addForm");
	addBox.classList.add("hidden");
},false);

// Close form on OK
ok.addEventListener('click', function(event){
  event.preventDefault();

  var foodName = document.getElementById("foodName").value;

  console.log("foodName = " + foodName);

  $.get(url+"/addPersonal/"+foodName, addCallback);

},false);

function addCallback(response) {
  var id = response["id"];
	var imageName = response["imageName"];
	var imageURL = response["imageURL"];
	console.log(id + " " + imageName + " " + imageURL);

  //$("#project" + id + " .details").html(projectHTML);
  location.reload();
}
