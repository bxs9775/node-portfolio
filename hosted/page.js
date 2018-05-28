"use strict";
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
