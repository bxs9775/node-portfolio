"use strict";

// Events
//Changes the images being loaded when the screen goes below a cerain size.
var adjustImages = function adjustImages() {
  var fullImage = document.querySelector("#fullImage");
  var thumbnail = document.querySelector("#thumbnail");
  if (window.innerWidth <= 900) {
    fullImage.style.display = "none";
    thumbnail.style.display = "block";
  } else {
    fullImage.style.display = "block";
    thumbnail.style.display = "none";
  }
};

// Setup
var setup = function setup() {
  window.onresize = adjustImages;
  adjustImages();
};

window.onload = setup;
"use strict";

//Handles AJAX calls to the server - derived from sample code used in Rich Media II
var sendAjax = function sendAjax(type, action, data, success) {

  //const contentType = contType || "application/x-www-form-urlencoded; charset=UTF-8";

  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: success,
    error: function error(xhr, status, _error) {
      try {
        var messageObj = JSON.parse(xhr.responseText);
        console.log(messageObj.error);
      } catch (e) {
        console.log("An error has occured.");
      }
    }
  });
};
