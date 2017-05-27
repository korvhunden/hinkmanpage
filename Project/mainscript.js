var numberOfTurns = 10
var numberOfDice = 3
var numberOfMultiplierDice = 1
var userGuess = 0

$(document).ready(function() {

  var loggedIn = false
  if (loggedIn) {
    $("#log_out_button").show();
    $("#create_account_button").hide();
    $("#sign_in_button").hide();
  }
  else {
    $("#log_out_button").hide();
    $("#create_account_button").show();
    $("#sign_in_button").show();
  }

  var game // the game object

  hideEverything(); // Hides all elements the user is not supposed to see until selected in the menu

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

  })

  function updateGui() {
    // $("#dice1").text(game.diceArray[0]);
    // $("#dice2").text(game.diceArray[1]);
    // $("#dice3").text(game.diceArray[2]);
    // $("#multiplierdice1").text(game.multiplierDiceArray[0]);
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
    alert("No value between 1 - 6 given for dice: " + id)
    }
  }

  $("#global_highscore_button").click(function(){
    hideEverything();
    $("#global_highscore").show();
  })

  $("#personal_highscore_button").click(function(){
    hideEverything();
    $("#personal_highscore").show();
  })

  $("#roll_button").click(function() {

    userGuess = $("#user_guess_text").val();

    if (userGuess < 3 || userGuess > 18) {
      alert("Please enter a value between 3 and 18");
    }

    else {
      // Det ska snurra Lite
      game.rollDice();

      // If the guess is lower than the sum of the dice, add the guess multiplied with
      // the multiplier dice to the score and update
      if (userGuess <= game.getDiceSum()) {
        game.addScore(userGuess);
      }

      updateGui();

      if (game.checkGameOver()) {
        alert("Game over. Your score: " + game.totalScore);
        game = new DiceGame(numberOfDice, numberOfMultiplierDice, numberOfTurns);
        updateGui();
      }

    }

  })

  $("#log_in_box").submit(function() {
    loggedIn = true;
  })

  $("#create_account_box").submit(function() {
    loggedIn = true;
  })

  $("#log_out_button").click(function() {
    loggedIn = false;
  })


});
