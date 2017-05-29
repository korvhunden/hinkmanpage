$(document).ready(function() {

  // var serverURL = url?

  function loginRequest(inputEmail, inputPsw) {
    var argumentsToSend = { "email":inputEmail, "password":inputPsw };
    var JSONargumentsToSend = JSON.stringify(argumentsToSend);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readystate == 4 & this.status == 200) {
        
      }
    }
  }







}
