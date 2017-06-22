// This is the dicegame

function createDiceArray(noOfDice) {
  var diceArray = [noOfDice];
  for (var i = 0; i < noOfDice; i++)
  {
    diceArray[i] = 6;
  }
  return diceArray;
}

function createMultiplierDiceArray(noOfDice) {
  var multiplierDiceArray = [noOfDice];
  for (var i = 0; i < noOfDice; i++)
  {
    multiplierDiceArray[i] = 6;
  }
  return multiplierDiceArray;
}

// Adds all values in an array, in this code the values of the dice
function sumOfArrayValues(array)
{
  var sum = 0;
  for (var i = 0; i < array.length; i++)
  {
    sum += array[i];
  }
  return sum;
}

function DiceGame(noOfDice, noOfMultiplierDice, noOfTurns) {
  this.noOfDice = noOfDice;
  this.noOfMultiplierDice = noOfMultiplierDice;
  this.noOfTurns = noOfTurns;
  this.turnsLeft = noOfTurns;
  this.playerGuess = 0;
  this.totalScore = 0;

  this.diceArray = createDiceArray(noOfDice);
  this.multiplierDiceArray = createMultiplierDiceArray(noOfMultiplierDice);
}

DiceGame.prototype.checkGameOver = function() {
  return this.turnsLeft === 0;
};

DiceGame.prototype.getTurn = function() {
  return this.noOfTurns + 1 - this.turnsLeft;
};

// Updates the total score with the users guess multiplied with the multiplier dice
DiceGame.prototype.addScore = function(userGuess) {
  this.totalScore += userGuess * sumOfArrayValues(this.multiplierDiceArray);
};

// Returns sum of the dice
DiceGame.prototype.getDiceSum = function() {
  return sumOfArrayValues(this.diceArray) ;
};

DiceGame.prototype.rollDice = function () {

    // Gives the dice randomised values between 1-6
    for (var i = 0; i < this.noOfDice; i++)
    {
      this.diceArray[i] = Math.ceil(Math.random() * 6);
    }
    for (i = 0; i < this.noOfMultiplierDice; i++)
    {
      this.multiplierDiceArray[i] = Math.ceil(Math.random() * 6);
    }

    this.turnsLeft--;

};
