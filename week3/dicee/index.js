// AI-GENERATED (UX IMPROVEMENT): Main function to roll dice
// This function is called when user clicks the "ROLL DICE" or "Play Again" button
// Much better UX than requiring page refresh
function rollDice() {
  // AI-GENERATED: Remove sparkle animation from all dice before rolling
  // This ensures the animation resets for the next roll
  var allDice = document.querySelectorAll(".dice");
  allDice.forEach(function(dice) {
    dice.classList.remove("winner-sparkle");
  });

  // AI-GENERATED: Generate random numbers for all three players' dice rolls
  // Math.floor(Math.random() * 6) generates 0-5, adding 1 gives us 1-6
  var randomNumber1 = Math.floor(Math.random() * 6) + 1; // Player 1: 1-6
  var randomNumber2 = Math.floor(Math.random() * 6) + 1; // Player 2: 1-6
  var randomNumber3 = Math.floor(Math.random() * 6) + 1; // Player 3: 1-6

  // AI-GENERATED: Construct and set image for Player 1
  var randomImageSource1 = "images/dice" + randomNumber1 + ".png";
  document.querySelectorAll("img")[0].setAttribute("src", randomImageSource1);

  // AI-GENERATED: Construct and set image for Player 2
  var randomImageSource2 = "images/dice" + randomNumber2 + ".png";
  document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

  // AI-GENERATED: Construct and set image for Player 3
  var randomImageSource3 = "images/dice" + randomNumber3 + ".png";
  document.querySelectorAll("img")[2].setAttribute("src", randomImageSource3);

  // AI-GENERATED: Determine winner among three players
  // Logic: Find the maximum value, then check if only ONE player has that max value
  // If multiple players have the same highest number, it's NO ONE wins

  var maxNumber = Math.max(randomNumber1, randomNumber2, randomNumber3);
  var winnersCount = 0; // Count how many players have the max number
  var winnerNumber = 0; // Track which player won

  // AI-GENERATED: Count how many players rolled the maximum number
  if (randomNumber1 === maxNumber) {
    winnersCount++;
    winnerNumber = 1;
  }
  if (randomNumber2 === maxNumber) {
    winnersCount++;
    winnerNumber = 2;
  }
  if (randomNumber3 === maxNumber) {
    winnersCount++;
    winnerNumber = 3;
  }

  // AI-GENERATED (UX IMPROVEMENT): Display result in prominent result display area
  // If only 1 player has the max number, they win
  // If 2 or 3 players have the same max number, NO ONE wins
  var resultDisplay = document.getElementById("resultDisplay");
  
  // AI-GENERATED (CASINO MESSAGES): Array of friendly casino phrases for winners and tie games
  var winMessages = [
    "🎉 Player " + winnerNumber + " is a HIGH ROLLER! 🎉",
    "🎉 Player " + winnerNumber + " WINS BIG! 🎉",
    "🎉 JACKPOT! Player " + winnerNumber + " Wins! 🎉",
    "🎉 Hot dice! Player " + winnerNumber + " Wins! 🎉",
    "🎉 LADY LUCK smiles on Player " + winnerNumber + "! 🎉"
  ];
  
  var tieMessages = [
    "🤝 The dice have spoken... NO ONE WINS this round! 🤝",
    "🤝 It's a TIE! The house stays cool! 🤝",
    "🤝 Better luck next time, my friend! 🤝",
    "🤝 No winner today - try rolling again! 🤝",
    "🤝 The dice gods are feeling mysterious! 🤝"
  ];
  
  if (winnersCount === 1) {
    // Only one player has the highest number - they are the winner
    // Pick a random congratulations message
    var randomWinIndex = Math.floor(Math.random() * winMessages.length);
    resultDisplay.innerHTML = winMessages[randomWinIndex];
    resultDisplay.style.color = "#FFD700"; // Gold color for winner

    // AI-GENERATED (WINNER CELEBRATION): Add sparkle animation to the winner's dice
    // Convert winner number (1-3) to array index (0-2)
    var winnerDiceIndex = winnerNumber - 1;
    document.querySelectorAll(".dice")[winnerDiceIndex].classList.add("winner-sparkle");
  } else {
    // AI-GENERATED: Multiple players have the same highest number - NO ONE WINS
    // Examples: (5,5,2), (5,5,5), (4,4,4), (6,6,3) all result in NO ONE winning
    // Pick a random tie message
    var randomTieIndex = Math.floor(Math.random() * tieMessages.length);
    resultDisplay.innerHTML = tieMessages[randomTieIndex];
    resultDisplay.style.color = "#FF6B6B"; // Red/pink color for no winner
  }
}

// AI-GENERATED (UX IMPROVEMENT): Roll dice automatically when page loads
// This gives immediate feedback and shows how the game works
window.onload = function() {
  rollDice();
};


