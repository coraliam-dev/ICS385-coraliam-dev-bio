// ============================================
// SIMON GAME - JAVASCRIPT CODE
// This file contains all the JavaScript logic for the Simon memory game.
// The goal is to help new programmers understand how the game works and how to extend it.
//
// JavaScript is the language that makes web pages interactive.
// This code uses jQuery, a library that makes it easier to work with HTML elements.
// ============================================


// =====================
// VARIABLES - These store data that the game needs
// =====================

// Array of four colors used in the game
// Arrays are lists of items stored in square brackets []
// We use this to store the colors so we can access them by index (position)

// List of button colors used in the game.
// You can add more colors here to make the game harder!
var buttonColours = ["red", "blue", "green", "yellow"];

// This array stores the sequence of colors that the game generates
// The game adds a new color each level
// Example: after level 1, it might be ["red"]
// After level 2, it might be ["red", "green"]

// The sequence of colors the game will show the player.
// This array grows longer as the player advances.
var gamePattern = [];

// This array stores the sequence of colors the user has clicked
// We use this to check if the user's clicks match the game's sequence
// It gets reset to empty [] when a new sequence starts

// The sequence of colors the player clicks.
// This is compared to gamePattern to check if the player is correct.
var userClickedPattern = [];

// Boolean (true/false) variable to track whether the game has started
// We set this to false at the beginning
// When the user presses a key, we set it to true

// Tracks if the game has started yet.
// Prevents the game from starting multiple times at once.
var started = false;

// Variable to track what level the player is currently on
// Level increases by 1 each time the user successfully completes a sequence
// This makes the game harder as levels increase

// The current level (round) the player is on.
// Increases by 1 each time the player completes a sequence.

// [AI-GENERATED] The current level (round) the player is on.
// Now starts at -1 to allow for a special Level 0 (practice) before normal play.
var level = -1;


// [AI-GENERATED] Control the speed of the color flash for each level.
// At Level 0 (practice), the flash is much slower for beginners.
var flashSpeed = 100; // ms, will be set dynamically

// [AI-GENERATED] Track the number of practice plays at Level 0
var practiceCount = 0;
var PRACTICE_LIMIT = 3;


// =====================
// EVENT LISTENERS - React to user actions
// =====================



// [AI-GENERATED] Show encouraging introduction overlay on page load and handle overlays
$(document).ready(function() {
  $("#ai-intro-overlay").show();
  $("#ai-close-intro").click(function() {
    $("#ai-intro-overlay").fadeOut(300, function() {
      // After intro, show beginner overlay if needed
      if (localStorage.getItem('simonBeginnerSeen') !== 'yes') {
        $("#ai-beginner-overlay").show();
      } else {
        $("#ai-beginner-overlay").hide();
      }
    });
  });
  $("#ai-close-beginner").click(function() {
    $("#ai-beginner-overlay").fadeOut(300);
    localStorage.setItem('simonBeginnerSeen', 'yes');
  });
  // [AI-GENERATED] Handle 'You are ready' overlay
  $("#ai-close-ready").click(function() {
    $("#ai-ready-overlay").fadeOut(300, function() {
      // Start Level 1 after overlay closes
      level = 1;
      $("#level-title").text("Level 1");
      setTimeout(function() {
        nextSequence();
      }, 800); // Slow transition to Level 1
    });
  });
});

// [AI-GENERATED] Listen for any key press to start the game (after overlay is closed)

// [AI-GENERATED] Listen for any key press to start the game (after overlay is closed)
$(document).keypress(function() {
  if (!started && $("#ai-beginner-overlay").is(":hidden")) {
    // [AI-GENERATED] Start at Level 0 (practice)
    level = 0;
    $("#level-title").text("Level 0: Practice");
    nextSequence();
    started = true;
  }
});



// Listen for clicks on any button with the class "btn" (the colored game buttons)
// This function runs every time a button is clicked.
$(".btn").click(function() {


  // Get the color of the button that was clicked (its id)
  // $(this) refers to the button that was clicked
  var userChosenColour = $(this).attr("id");

  // Add the clicked color to the user's pattern
  userClickedPattern.push(userChosenColour);

  // Play the sound for the clicked color
  playSound(userChosenColour);

  // Animate the button press (visual feedback)
  animatePress(userChosenColour);

  // Check if the user's latest click is correct
  checkAnswer(userClickedPattern.length - 1);
});



// =====================
// FUNCTION DEFINITIONS
// =====================

// Check if the user's answer is correct so far
// currentLevel: the index of the most recent color the user clicked
function checkAnswer(currentLevel) {


  // Check if the user's most recent click matches the game's pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user has finished the whole sequence for this level
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second, then go to the next level
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // If the user made a mistake:
    // Play a "wrong" sound
    playSound("wrong");
    // Flash the screen red using a CSS class
    $("body").addClass("game-over");
    // Show a game over message
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Remove the red flash after 0.2 seconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Reset the game so the player can try again
    startOver();
  }
}



// Generate the next color in the sequence and show it to the player
// [AI-GENERATED] Generate the next color in the sequence and show it to the player
function nextSequence() {
  userClickedPattern = [];

  // [AI-GENERATED] Set flash speed based on level
  if (level === 0) {
    flashSpeed = 400; // Slow for practice
    $("#level-title").text("Level 0: Practice (" + (practiceCount+1) + "/" + PRACTICE_LIMIT + ")");
  } else if (level === 1) {
    flashSpeed = 250; // Slow down Level 1 for transition
    $("#level-title").text("Level 1");
  } else {
    flashSpeed = 100; // Normal speed
    $("#level-title").text("Level " + level);
  }

  // [AI-GENERATED] Only increment level after practice round
  if (level > 1) {
    level++;
    $("#level-title").text("Level " + level);
  }

  // Pick a random color
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(flashSpeed).fadeOut(flashSpeed).fadeIn(flashSpeed);
  playSound(randomChosenColour);

  // [AI-GENERATED] For practice, increment practiceCount and show 'YOU are ready to play!' before Level 1
  if (level === 0) {
    practiceCount++;
    if (practiceCount >= PRACTICE_LIMIT) {
      setTimeout(function() {
        $("#level-title").text("YOU are ready to play!");
        setTimeout(function() {
          level = 1;
          gamePattern = []; // [AI-GENERATED] Reset sequence for Level 1
          $("#level-title").text("Level 1");
          nextSequence();
        }, 4000); // Show message for 4 seconds
      }, 1200);
    }
  }
}



// Animate a button press (makes it look like it's being pressed)
function animatePress(currentColor) {
  // Add the CSS class for the pressed effect
  $("#" + currentColor).addClass("pressed");
  // Remove the effect after 0.1 seconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



// Play a sound for a given color (or "wrong" for errors)
function playSound(name) {
  // Create a new audio object and play the sound file
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Reset the game to its initial state so the player can try again

// [AI-GENERATED] Reset the game to its initial state so the player can try again
function startOver() {
  level = -1;
  gamePattern = [];
  started = false;
  practiceCount = 0;
}


// ============================================
// HOW TO EXTEND THIS CODE (Ideas for Practice!):
// ============================================
// 1. Add difficulty levels: Create a variable for difficulty and use it to change
//    how fast the sequence is shown or how many colors are used.
//
// 2. Add a high score: Track the highest level the player has reached and show it on the page.
//
// 3. Add more colors: Add more color names to the buttonColours array and add matching buttons in index.html.
//    Update the random number code to use buttonColours.length instead of 4.
//
// 4. Add time pressure: Give the player less time to click as the levels increase.
//
// 5. Add a "ready?" prompt: Show a message before the sequence starts so the player can get ready.
//
// 6. Track stats: Count how many times the player wins, loses, or how long they last.
//
// 7. Add sound and visual effects: Try changing the sounds or adding new animations!
//
// 8. Make it mobile-friendly: Adjust the CSS so it works well on phones and tablets.
// ============================================
