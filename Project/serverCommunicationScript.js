var MAXGLOBALHIGHSCORE = 10;
var MAXPERSONALHIGHSCORE = 10;

// ---- Start of request functions for server communication ----------

function loginRequest(user, inputEmail, inputPsw) {

  console.log("loginRequest got: " + inputEmail + " " + inputPsw);
  var argumentsToSend = { "email":inputEmail, "password":inputPsw };
  var JSONargumentsToSend = JSON.stringify(argumentsToSend);
  console.log("loginRequest will send" + JSONargumentsToSend);

  var request = new XMLHttpRequest();

  request.open("POST", "http://193.10.30.163/users/login", true);
  request.setRequestHeader("Content-Type", "application/json");

  request.addEventListener("load", function() {
    console.log("Respone from server, status code: " + request.status);
    console.log("Body: ", request.responseText);

    var parsedResponse = JSON.parse(request.responseText); // Gives us an object from the servers response

    // If the response status is ok (200)
    if (request.status == 200)
    {
      user.loggedIn = true;
      user.email = parsedResponse.email;
      user.username = parsedResponse.username;
      user.fName = parsedResponse.firstName;
      user.lName = parsedResponse.lastName;
      user.sessionId = parsedResponse.session;
      console.log("Variables of user changed");
      $("#log_in_box").hide();
      $("#account_Name_Display").append("Logged in as: " + user.username);
    }
    else if (request.status == 400) {
      alert("Error - status code: 400. Something is wrong with the request sent to the server. Consult your local computer wizard for help");
    }
    else if (request.status == 401) {
      if (parsedResponse.wrongEmail) {
        alert("No account with the given email adress was found");
      }
      else if (parsedResponse.wrongPassword) {
          alert("Incorrect password");
      }
    }
    else if (request.status == 415) {
      alert("Error 415: Unsupported Media Type, the Content-Type header is wrong. Consult your local computer wizard for help");
    }
    else {
      alert("Unknown error ocurred. Status code: " + request.status);
    }
    console.log("Right before checkLoggedIn in serverCom user.loggedIn is: " + user.loggedIn);
    checkLoggedIn();
  });

  request.send(JSONargumentsToSend); // Sends the login data to the server
}

function createAccountRequest(user, usernameInput, fNameInput, lNameAcount, emailInput, passwordInput) {

  console.log("createAccountRequest got: " + emailInput + " " + usernameInput + " " + passwordInput + " " + fNameInput + " " + lNameAcount);
  var argumentsToSend = {"email":emailInput, "username":usernameInput,
"password":passwordInput, "firstName":fNameInput, "lastName":lNameAcount};
  var JSONargumentsToSend = JSON.stringify(argumentsToSend);
  console.log("createAccountRequest will send" + argumentsToSend);

  var request = new XMLHttpRequest();

  request.open("POST", "http://193.10.30.163/users", true);
  request.setRequestHeader("Content-Type", "application/json");

  request.addEventListener("load", function() {
    console.log("Respone from server, status code:" + " " + request.status);
    console.log("Body: ", request.responseText);

    var parsedResponse = JSON.parse(request.responseText); // Gives us an object from the servers response

    // If the response status is ok (200)
    if (request.status == 200)
    {
      $("#create_account_box").hide();
      return true;
    }
    else if (request.status == 400) {
      alert("Error - status code: 400. Something is wrong with the request sent to the server. Consult your local computer wizard for help");
      return false;
    }
    else if (request.status == 415) {
      alert("Error 415: Unsupported Media Type, the Content-Type header is wrong. Consult your local computer wizard for help");
      return false;
    }
    else if (request.status == 422) {
      if (parsedResponse.emailTaken) {
        alert("The entered email adress is already in use");
      }
      else if (parsedResponse.usernameTaken) {
        alert("The entered username is already in use");
      }
      else if (parsedResponse.passwordEmpty) {
        alert("No password was sent to the server. Did you enter one?");
      }
      else {
        alert("An unknown error occured. Error code: " + request.status);
      }
      return false;
    }

  });
  request.send(JSONargumentsToSend);
}

function logOutRequest(user) {

  console.log("logOutRequest initiated");
  var textArgumentsToSend = "<?xml version='1.0'?><data><session>" + user.sessionId + "</session></data>";
  var parser = new DOMParser();
  var XMLargumentsToSend = parser.parseFromString(textArgumentsToSend, "text/xml");

  console.log("logOutRequest will send" + textArgumentsToSend);

  var request = new XMLHttpRequest();

  request.open("POST", "http://193.10.30.163/users/logout", true);
  request.setRequestHeader("Content-Type", "application/xml");

  request.addEventListener("load", function() {
    console.log("Respone from server, status code:" + " " + request.status);
    console.log("Body: ", request.responseText);

    if (request.status == 200)
    {
      user.loggedIn = false;
      user.email = null;
      user.username = null;
      user.fName = null;
      user.lName = null;
      user.sessionId = null;
      console.log("User data changed! LoggedIn: " + user.loggedIn);
      $("#account_Name_Display").empty();
      $("#log_in_box").show();
    }
    else if (request.status == 400) {
      alert("Error - status code: 400. Something is wrong with the request sent to the server. Consult your local computer wizard for help");
    }
    else if (request.status == 415) {
      alert("Error 415: Unsupported Media Type, the Content-Type header is wrong. Consult your local computer wizard for help");
    }
    else {
      alert("An unknown error occured. Error code: " + request.status);
    }
    checkLoggedIn();
  });

  request.send(XMLargumentsToSend);

}

function addScoreRequest(user, scoreToAdd) {

  console.log("addScoreRequest initiated");
  var textArgumentsToSend = "<?xml version='1.0'?><data><session>"+user.sessionId+"</session><score>"+scoreToAdd+"</score></data>";
  var parser = new DOMParser();
  var XMLargumentsToSend = parser.parseFromString(textArgumentsToSend, "text/xml");

  console.log("addScoreRequest will send" + textArgumentsToSend);

  var request = new XMLHttpRequest();

  request.open("POST", "http://193.10.30.163/scores/" + user.username, true);
  request.setRequestHeader("Content-Type", "application/xml");

  request.addEventListener("load", function() {
    console.log("Respone from server, status code: " + request.status);
    console.log("Body: ", request.responseText);

    if (request.status == 200)
    {
      console.log("Score has been added: " + scoreToAdd);
      return true;
    }
    else if (request.status == 400) {
      alert("Error - status code: 400. Something is wrong with the request sent to the server. Consult your local computer wizard for help");
      return false;
    }
    else if (request.status == 401) {
      alert("Error - status code: 401 - Unauthorized. Session ID no longer valid. Consult your local computer wizard for help");
      return false;
    }
    else if (request.status == 404) {
      alert("Error - status code: 404. No user with the given username found.");
      return false;
    }
    else if (request.status == 415) {
      alert("Error 415: Unsupported Media Type, the Content-Type header is wrong. Consult your local computer wizard for help");
      return false;
    }
    else {
      alert("An unknown error occured. Error code: " + request.status);
    }

  });

  request.send(XMLargumentsToSend);

}

// -- To get the global highscore --

function globalHighscoreRequest(user) {
  $.ajax({
      url: "http://193.10.30.163/scores?callback=jsonpCallback&session="+user.sessionId,
      type: "GET",
      dataType: "jsonp",
      jsonpCallback: "globalHighscoreCallback"
    });

}

function globalHighscoreCallback(response) {
  console.log("We got response from server!");
  console.log("Status code:", response.status);
  console.log("Data:", response.data);

  if (response.status == 200) {
    var tableToReturn = document.createElement("table");
    for (var i = 0; i < MAXGLOBALHIGHSCORE; i++) {
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");
      var th3 = document.createElement("th");
      var rankTextNode = document.createTextNode(i + 1);
      var userTextNode = document.createTextNode(response.data.scores[i].username);
      var scoreTextNode = document.createTextNode(response.data.scores[i].score);

      th1.appendChild(rankTextNode);
      th2.appendChild(userTextNode);
      th3.appendChild(scoreTextNode);
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);

      tableToReturn.appendChild(tr);
    }
    $("#global_highscore").empty();
    $("#global_highscore").append(tableToReturn);
  }
  else if (response.status == 400) {
    alert("Error - status code: 400. Something is wrong with the request sent to the server. Consult your local computer wizard for help");
    return false;
  }
  else if (request.status == 401) {
    alert("Error - status code: 401 - Unauthorized. Session ID no longer valid. Consult your local computer wizard for help");
    return false;
  }
  else {
    alert("Unknown error with globalHighscoreCallback. Error code: " + response.status);
    return false;
  }
}

// -- To get personal highscore

function personalHighscoreRequest(user) {
  $.ajax({
      url: "http://193.10.30.163/scores/"+user.username+"?callback=jsonpCallback&session="+user.sessionId,
      type: "GET",
      dataType: "jsonp",
      jsonpCallback: "personalHighscoreCallback"
    });

}

function personalHighscoreCallback(response) {
  console.log("We got response from server!");
  console.log("Status code:", response.status);
  console.log("Data:", response.data);

  if (response.status == 200) {
    var tableToReturn = document.createElement("table");
    for (var i = 0; i < MAXPERSONALHIGHSCORE; i++) {
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");
      var rankTextNode = document.createTextNode(i + 1);
      var scoreTextNode = document.createTextNode(response.data.scores[i].score);

      th1.appendChild(rankTextNode);
      th2.appendChild(scoreTextNode);
      tr.appendChild(th1);
      tr.appendChild(th2);

      tableToReturn.appendChild(tr);
    }
    $("#personal_highscore").empty();
    $("#personal_highscore").append(tableToReturn);
  }
  else if (response.status == 400) {
    alert("Error - status code: 400. Something is wrong with the request sent to the server. Consult your local computer wizard for help");
    return false;
  }
  else if (request.status == 401) {
    alert("Error - status code: 401 - Unauthorized. Session ID no longer valid. Consult your local computer wizard for help");
    return false;
  }
  else if (request.status == 404) {
    alert("Error 404 - there does not exist a user with the given username");
    return false;
  }
  else {
    alert("Unknown error with personalHighscoreCallback. Error code: " + response.status);
    return false;
  }
}

// ---- End of request functions for server communication ----------
