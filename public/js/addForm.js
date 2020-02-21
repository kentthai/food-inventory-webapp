'use strict';

const url = "https://a7-fud.herokuapp.com";

const container = document.querySelector(".container");
const add = document.querySelector(".add");
const cancel = document.querySelector(".CancelButton");
const ok = document.querySelector(".OkButton");


$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  // Close form on OK
  ok.addEventListener('click', addFood);
  cancel.addEventListener('click', cancel_func);
}

// Add event listener to remove button


function addFood (event){
  // event.preventDefault();
  console.log("ok");
  var foodName = document.getElementById("foodName").value;

  console.log("foodName = " + foodName);

  $.get(url+"/addPersonal/"+foodName, addCallback);

}

function addCallback(response) {
  var id = response["id"];
  var imageName = response["imageName"];
  var imageURL = response["imageURL"];
  console.log(id + " " + imageName + " " + imageURL);
  window.location.href = "/home";
  //$("#project" + id + " .details").html(projectHTML);
  // location.reload();
}

function cancel_func(response) {
  console.log('Cancel');
  window.location.href = "/home";
  console.log('Cancel2');
}
