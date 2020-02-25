'use strict';

//const url = "https://a7-fud.herokuapp.com";
const url = "http://localhost:3000";


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

  var regularRoute = (document.getElementById("altAdd") == null);

  console.log("foodName = " + foodName);

  if (regularRoute) {
    $.get(url+"/addPersonal/"+foodName, addCallback);
  } else {
    $.get(url+"/addPersonal/"+foodName, altAddCallback);
  }

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

function altAddCallback(response) {
  var id = response["id"];
  var imageName = response["imageName"];
  var imageURL = response["imageURL"];
  console.log(id + " " + imageName + " " + imageURL);
  window.location.href = "/home_b";
  //$("#project" + id + " .details").html(projectHTML);
  location.reload();
}

function cancel_func(response) {
  console.log('Cancel');
  window.location.href = "/home";
  console.log('Cancel2');
}
