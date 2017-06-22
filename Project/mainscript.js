var numberOfTurns = 10;
var numberOfDice = 3;
var numberOfMultiplierDice = 1;
var userGuess = 0;
var loggedIn = false; // When you first open the website you are logged out
var game; // the game object
function createUser() { // Constructor for the user object
  this.loggedIn = false;
  this.email = null;
  this.username = null;
  this.fName = null;
  this.lName = null;
  this.sessionId = null;
};
var user = new createUser; // The user object

function checkLoggedIn() {
  console.log("Logincheck! user.loggedIn is: " + user.loggedIn);
  if (user.loggedIn) {
    $("#log_out_button").show();
    $("#create_account_button").hide();
    $("#sign_in_button").hide();

    // Changes apperance of and enables the highscore buttons
    $("#global_highscore_button, #personal_highscore_button").css("cursor", "pointer");


  }
  else {
    $("#log_out_button").hide();
    $("#create_account_button").show();
    $("#sign_in_button").show();

    // Changes apperance of and disables the highscore buttons
    $("#global_highscore_button, #personal_highscore_button").css("cursor", "not-allowed");
  }

}

$(document).ready(function() {


  hideEverything(); // Hides all elements the user is not supposed to see until selected in the menu
  checkLoggedIn();

  function hideEverything() {
    $("#global_highscore").hide();
    $("#personal_highscore").hide();
    $("#dice_game").hide();
  }

  $("#play_game_button").click(function(){
    hideEverything();
    $("#dice_game").show();

    game = new DiceGame(numberOfDice, numberOfMultiplierDice, numberOfTurns);

    updateGui();

  });

  function updateGui() {
    changeDiceImg("#dice1", game.diceArray[0]);
    changeDiceImg("#dice2", game.diceArray[1]);
    changeDiceImg("#dice3", game.diceArray[2]);
    changeDiceImg("#multiplierdice1", game.multiplierDiceArray[0]);
    $("#turn_span").text(game.getTurn());
    $("#score_span").text(game.totalScore);
    $("#dice_sum_span").text(game.getDiceSum());
  }

  function changeDiceImg(id, value) {
    switch (value)
    {
    case 1:
    $(id).attr('src','resources/dice1.png');
    break;
    case 2:
    $(id).attr('src','resources/dice2.png');
    break;
    case 3:
    $(id).attr('src','resources/dice3.png');
    break;
    case 4:
    $(id).attr('src','resources/dice4.png');
    break;
    case 5:
    $(id).attr('src','resources/dice5.png');
    break;
    case 6:
    $(id).attr('src','resources/dice6.png');
    break;
    default:
    alert("No value between 1 - 6 given for dice: " + id);
    }
  }

  $("#global_highscore_button").click(function(){
    if (user.loggedIn) {
      hideEverything();
      globalHighscoreRequest(user);
      $("#global_highscore").show();
    }
    else {
      alert("You must be logged in to see highscores")
    }

  });

  $("#personal_highscore_button").click(function(){
    if (user.loggedIn) {
      hideEverything();
      personalHighscoreRequest(user);
      $("#personal_highscore").show();
    }
    else {
      alert("You must be logged in to see highscores")
    }
  });

  $("#roll_button").click(function() {

    userGuess = $("#user_guess_text").val();

    if (userGuess < 3 || userGuess > 18) {
      alert("Please enter a value between 3 and 18");
    }

    else {
      game.rollDice();

      // If the guess is lower than the sum of the dice, add the guess multiplied with
      // the multiplier dice to the score and update
      if (userGuess <= game.getDiceSum()) {
        game.addScore(userGuess);
      }

      updateGui();

      if (game.checkGameOver()) {
        updateGui();
        alert("Game over. Your score: " + game.totalScore);
        if (user.loggedIn) {
          addScoreRequest(user, game.totalScore);
        }
        game = new DiceGame(numberOfDice, numberOfMultiplierDice, numberOfTurns);
        updateGui();
      }

    }

  });

  $("#log_in_box").submit(function() {
    event.preventDefault();
    user = new createUser();

    var userEmailInput = $("#login_email_input").val();
    var userPasswordInput = $("#login_password_input").val();

    loginRequest(user, userEmailInput, userPasswordInput);

  });

  $("#create_account_box").submit(function() {
    event.preventDefault();
    user = new createUser();

    var userUsernameInput = $("#create_account_username").val();
    var userFNameInput = $("#create_account_fname").val();
    var userLNameAcount = $("#create_account_lname").val();
    var userEmailInput = $("#create_account_email").val();
    var userPasswordInput = $("#create_account_password").val();

    if (createAccountRequest(user, userUsernameInput, userFNameInput, userLNameAcount, userEmailInput, userPasswordInput)) {
      loggedIn = true;
      loginRequest(user, userEmailInput, userPasswordInput); // Log in the created user
      console.log("loginRequest after createAccountRequest happening");
    }
    alert("Create account box submited");
    checkLoggedIn();
  });

  $("#log_out_button").click(function() {
    event.preventDefault();

    logOutRequest(user);

    console.log("log_out_button pressed")
  });

  function updateGlobalHighscore() {
    var globalHighscoreTable = globalHighscoreRequest();
    if (globalHighscoreTable) {
      $("#global_highscore").empty();
      $("#global_highscore").append(globalHighscoreTable);
    }
    else {
      alert("globalHighscoreRequest failed");
    }
  }


});
