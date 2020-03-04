'use strict';

const amount = document.querySelector(".amount");
const ok = document.querySelector(".OkButton");


$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  ok.addEventListener('click', validateForm);
}

// This stuff actually doesn't run since it is not included in the addForm html



function validateForm (event){
  // event.preventDefault();
  console.log("ok");
  var amountVal = parseInt(amount.value, 10);

  if (amountVal == NaN) {
    console.log("Not a number!")
    event.preventDefault();
  }

}